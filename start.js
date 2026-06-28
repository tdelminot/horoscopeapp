// start.js - Script centralisé pour démarrer backend et frontend
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const config = {
    backend: {
        dir: './backend',
        command: 'npm',
        args: ['run', 'dev'],
        port: 3000,
        readyMessage: 'Serveur sécurisé démarré sur http://localhost:3000'
    },
    frontend: {
        dir: './frontend',
        command: 'npm',
        args: ['run', 'dev'],
        port: 3001,
        readyMessage: 'VITE v'
    }
};

const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    red: '\x1b[31m'
};

class AppStarter {
    constructor() {
        this.processes = {};
        this.ready = {};
        this.startTime = Date.now();
    }

    log(message, color = 'reset') {
        const timestamp = new Date().toLocaleTimeString();
        console.log(`${colors.cyan}[${timestamp}]${colors.reset} ${colors[color]}${message}${colors.reset}`);
    }

    async checkDependencies() {
        this.log('🔍 Vérification des dépendances...', 'yellow');
        
        if (!fs.existsSync('./backend')) {
            this.log('❌ Dossier backend manquant!', 'red');
            process.exit(1);
        }
        if (!fs.existsSync('./frontend')) {
            this.log('❌ Dossier frontend manquant!', 'red');
            process.exit(1);
        }

        const checkNodeModules = (dir) => {
            const modulesPath = path.join(dir, 'node_modules');
            if (!fs.existsSync(modulesPath)) {
                this.log(`⚠️  ${dir}/node_modules manquant. Exécutez 'npm install' dans ${dir}`, 'yellow');
                return false;
            }
            return true;
        };

        const backendOk = checkNodeModules('./backend');
        const frontendOk = checkNodeModules('./frontend');

        if (!backendOk || !frontendOk) {
            this.log('❌ Dépendances manquantes. Installez-les avant de continuer.', 'red');
            this.log(`📦 Commandes à exécuter:
  cd backend && npm install
  cd frontend && npm install`, 'yellow');
            process.exit(1);
        }

        this.log('✅ Toutes les dépendances sont présentes', 'green');
    }

    startService(name, config) {
        this.log(`🚀 Démarrage du ${name}...`, 'blue');
        
        const servicePath = path.join(__dirname, config.dir);
        const env = {
            ...process.env,
            NODE_ENV: 'development',
            PORT: config.port,
            FORCE_COLOR: '1'
        };

        const child = spawn(config.command, config.args, {
            cwd: servicePath,
            stdio: 'pipe',
            env: env,
            shell: true
        });

        this.processes[name] = child;
        this.ready[name] = false;

        child.stdout.on('data', (data) => {
            const output = data.toString();
            
            if (output.includes(config.readyMessage) && !this.ready[name]) {
                this.ready[name] = true;
                this.log(`✅ ${name} prêt sur le port ${config.port}`, 'green');
                this.checkAllReady();
            }

            const lines = output.split('\n').filter(line => line.trim());
            for (const line of lines) {
                const prefix = name === 'backend' ? colors.green : colors.magenta;
                console.log(`${prefix}[${name}]${colors.reset} ${line}`);
            }
        });

        child.stderr.on('data', (data) => {
            const error = data.toString();
            const prefix = name === 'backend' ? colors.red : colors.yellow;
            console.error(`${prefix}[${name} ERROR]${colors.reset} ${error}`);
        });

        child.on('error', (error) => {
            this.log(`❌ Erreur du ${name}: ${error.message}`, 'red');
            this.shutdown();
        });

        child.on('close', (code) => {
            if (code !== 0 && code !== null) {
                this.log(`❌ ${name} s'est arrêté avec le code ${code}`, 'red');
                this.shutdown();
            }
        });

        return child;
    }

    checkAllReady() {
        const allReady = Object.values(this.ready).every(ready => ready === true);
        if (allReady) {
            const elapsed = ((Date.now() - this.startTime) / 1000).toFixed(1);
            this.log('', 'reset');
            this.log('═════════════════════════════════════════════', 'cyan');
            this.log('✨ APPLICATION PRÊTE ! ✨', 'bright');
            this.log(`⏱️  Démarrée en ${elapsed}s`, 'cyan');
            this.log('', 'reset');
            this.log(`🌐 Frontend:  ${colors.blue}http://localhost:${config.frontend.port}${colors.reset}`, 'cyan');
            this.log(`🔧 Backend:   ${colors.blue}http://localhost:${config.backend.port}${colors.reset}`, 'cyan');
            this.log(`📊 Health:    ${colors.blue}http://localhost:${config.backend.port}/health${colors.reset}`, 'cyan');
            this.log('', 'reset');
            this.log('📝 Pour arrêter : Ctrl+C', 'yellow');
            this.log('═════════════════════════════════════════════', 'cyan');
        }
    }

    shutdown() {
        this.log('🛑 Arrêt des services...', 'yellow');
        
        for (const [name, child] of Object.entries(this.processes)) {
            if (child && !child.killed) {
                child.kill('SIGTERM');
                this.log(`✅ ${name} arrêté`, 'green');
            }
        }

        setTimeout(() => {
            for (const [name, child] of Object.entries(this.processes)) {
                if (child && !child.killed) {
                    child.kill('SIGKILL');
                    this.log(`⚠️ ${name} arrêté brutalement`, 'yellow');
                }
            }
            process.exit(0);
        }, 5000);
    }

    async start() {
        this.log('════════════════════════════════════════════ ', 'cyan');
        this.log('  HOROSCOPE APP - DÉMARRAGE CENTRALISÉ  ', 'bright');
        this.log('═════════════════════════════════════════════', 'cyan');
        this.log('', 'reset');

        await this.checkDependencies();

        this.startService('backend', config.backend);

        setTimeout(() => {
            this.startService('frontend', config.frontend);
        }, 2000);

        process.on('SIGINT', () => {
            this.log('', 'reset');
            this.shutdown();
        });

        process.on('SIGTERM', () => {
            this.shutdown();
        });

        process.on('uncaughtException', (error) => {
            this.log(`❌ Erreur non capturée: ${error.message}`, 'red');
            this.shutdown();
        });
    }
}

const starter = new AppStarter();
starter.start();