module.exports = {
  extends: [
    'next/core-web-vitals',
    '@typescript-eslint/recommended',
  ],
  rules: {
    // Regra personalizada para detectar imports incorretos
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['../utils/*'],
            message: 'Use imports relativos corretos para utils. Exemplo: ../../../../utils/dateHelper'
          },
          {
            group: ['../styles/*'],
            message: 'Use imports relativos corretos para styles. Exemplo: ../../../../styles/theme'
          },
          {
            group: ['../contexts/*'],
            message: 'Use imports relativos corretos para contexts. Exemplo: ../../../../contexts/ReviewContext'
          },
          {
            group: ['../graphql/*'],
            message: 'Use imports relativos corretos para graphql. Exemplo: ../../../../graphql/client'
          }
        ]
      }
    ],
    // Outras regras úteis
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    'react-hooks/exhaustive-deps': 'warn'
  }
};
