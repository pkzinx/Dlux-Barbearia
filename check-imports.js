#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Padrões de imports incorretos que devem ser detectados
const incorrectPatterns = [
  {
    pattern: /from\s+['"]\.\.\/utils\//,
    message: 'Import incorreto: ../utils/ - Use ../../../../utils/ ou caminho relativo correto'
  },
  {
    pattern: /from\s+['"]\.\.\/styles\//,
    message: 'Import incorreto: ../styles/ - Use ../../../../styles/ ou caminho relativo correto'
  },
  {
    pattern: /from\s+['"]\.\.\/contexts\//,
    message: 'Import incorreto: ../contexts/ - Use ../../../../contexts/ ou caminho relativo correto'
  },
  {
    pattern: /from\s+['"]\.\.\/graphql\//,
    message: 'Import incorreto: ../graphql/ - Use ../../../../graphql/ ou caminho relativo correto'
  },
  {
    pattern: /from\s+['"]\.\.\/atoms\//,
    message: 'Import incorreto: ../atoms/ - Use ../../atoms/ ou caminho relativo correto'
  },
  {
    pattern: /from\s+['"]\.\.\/molecules\//,
    message: 'Import incorreto: ../molecules/ - Use ../../molecules/ ou caminho relativo correto'
  },
  {
    pattern: /from\s+['"]\.\.\/organisms\//,
    message: 'Import incorreto: ../organisms/ - Use ../../organisms/ ou caminho relativo correto'
  }
];

let hasErrors = false;

function checkFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
      incorrectPatterns.forEach(({ pattern, message }) => {
        if (pattern.test(line)) {
          console.error(`❌ ${filePath}:${index + 1}`);
          console.error(`   ${message}`);
          console.error(`   Linha: ${line.trim()}`);
          console.error('');
          hasErrors = true;
        }
      });
    });
  } catch (error) {
    console.error(`Erro ao ler arquivo ${filePath}:`, error.message);
  }
}

function processDirectory(dirPath) {
  const items = fs.readdirSync(dirPath);
  
  items.forEach(item => {
    const itemPath = path.join(dirPath, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      processDirectory(itemPath);
    } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
      checkFile(itemPath);
    }
  });
}

console.log('🔍 Verificando imports incorretos...\n');

// Processar todos os arquivos TypeScript/TSX
const srcPath = path.join(__dirname, 'src');
processDirectory(srcPath);

if (hasErrors) {
  console.log('❌ Foram encontrados imports incorretos!');
  console.log('💡 Execute: node fix-all-imports.js para corrigir automaticamente');
  process.exit(1);
} else {
  console.log('✅ Todos os imports estão corretos!');
  process.exit(0);
}
