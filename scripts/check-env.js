#!/usr/bin/env node

/**
 * Script para verificar se as variáveis de ambiente estão configuradas corretamente
 */

import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const requiredEnvVars = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY'
];

console.log('🔍 Verificando configuração do ambiente...\n');

// Verifica se o arquivo .env existe
const envPath = join(rootDir, '.env');
if (!existsSync(envPath)) {
  console.error('❌ Arquivo .env não encontrado!');
  console.log('\n📝 Para criar o arquivo .env:');
  console.log('   1. Copie o arquivo .env.example: cp .env.example .env');
  console.log('   2. Edite o arquivo .env com suas credenciais do Supabase');
  console.log('   3. Consulte SETUP.md para instruções detalhadas\n');
  process.exit(1);
}

// Lê o arquivo .env
const envContent = readFileSync(envPath, 'utf-8');
const envVars = {};

envContent.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const [key, ...valueParts] = trimmed.split('=');
    if (key && valueParts.length > 0) {
      envVars[key.trim()] = valueParts.join('=').trim();
    }
  }
});

// Verifica cada variável obrigatória
let hasErrors = false;
const errors = [];
const warnings = [];

requiredEnvVars.forEach(varName => {
  const value = envVars[varName];
  
  if (!value) {
    hasErrors = true;
    errors.push(`❌ ${varName} não está definida`);
  } else if (value.includes('your-') || value.includes('sua-') || value.includes('seu-')) {
    hasErrors = true;
    errors.push(`❌ ${varName} contém valor de exemplo (não foi configurada)`);
  } else {
    console.log(`✅ ${varName} está configurada`);
  }
});

// Verifica formato da URL do Supabase
if (envVars.VITE_SUPABASE_URL && !envVars.VITE_SUPABASE_URL.includes('supabase.co')) {
  warnings.push(`⚠️  VITE_SUPABASE_URL não parece ser uma URL válida do Supabase`);
}

// Verifica tamanho das chaves
if (envVars.VITE_SUPABASE_ANON_KEY && envVars.VITE_SUPABASE_ANON_KEY.length < 100) {
  warnings.push(`⚠️  VITE_SUPABASE_ANON_KEY parece muito curta`);
}

if (envVars.SUPABASE_SERVICE_ROLE_KEY && envVars.SUPABASE_SERVICE_ROLE_KEY.length < 100) {
  warnings.push(`⚠️  SUPABASE_SERVICE_ROLE_KEY parece muito curta`);
}

console.log('');

// Exibe avisos
if (warnings.length > 0) {
  console.log('⚠️  Avisos:\n');
  warnings.forEach(warning => console.log(`   ${warning}`));
  console.log('');
}

// Exibe erros
if (hasErrors) {
  console.log('❌ Erros encontrados:\n');
  errors.forEach(error => console.log(`   ${error}`));
  console.log('\n📖 Consulte SETUP.md para instruções de configuração');
  console.log('🔗 Acesse https://supabase.com para criar seu projeto\n');
  process.exit(1);
}

console.log('✅ Todas as variáveis de ambiente estão configuradas!');
console.log('🚀 Você pode executar: npm run dev\n');
