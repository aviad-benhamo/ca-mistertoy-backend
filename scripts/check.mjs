import { readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { spawnSync } from 'node:child_process'

const rootDirs = ['api', 'config', 'middlewares', 'services']
const filesToCheck = ['server.js']

for (const dir of rootDirs) {
    collectJsFiles(dir, filesToCheck)
}

filesToCheck.sort()

if (!filesToCheck.length) {
    console.error('No backend JavaScript files found to validate.')
    process.exit(1)
}

for (const file of filesToCheck) {
    const result = spawnSync(process.execPath, ['--check', file], {
        stdio: 'inherit'
    })

    if (result.status !== 0) {
        process.exit(result.status ?? 1)
    }
}

console.log(`Validated ${filesToCheck.length} backend JavaScript files.`)

function collectJsFiles(dirPath, targetFiles) {
    for (const entry of readdirSync(dirPath)) {
        const fullPath = join(dirPath, entry)
        const stats = statSync(fullPath)

        if (stats.isDirectory()) {
            collectJsFiles(fullPath, targetFiles)
            continue
        }

        if (stats.isFile() && fullPath.endsWith('.js')) {
            targetFiles.push(relative('.', fullPath))
        }
    }
}
