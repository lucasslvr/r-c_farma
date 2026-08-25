# R&C Farma — Mobile

## Como rodar

1. Instale as dependências (precisa de internet — no meu ambiente aqui eu não
   consigo baixar pacotes do npm, então instale na sua máquina):

   ```bash
   npm install
   ```

2. Suba o servidor de desenvolvimento:

   ```bash
   npx expo start
   ```

3. Abra no celular com o app **Expo Go** escaneando o QR code, ou pressione
   `a` (Android) / `i` (iOS) no terminal se tiver emulador configurado.

## Estrutura

```
src/
├── screens/       # telas completas (LoginScreen, etc.)
├── components/
│   ├── ui/        # componentes genéricos e reutilizáveis
│   └── auth/      # componentes específicos do fluxo de autenticação
└── theme/         # cores e tipografia centralizadas
```

## Status atual

- ✅ Tela de Login (UI, fiel ao Figma) — sem lógica de autenticação real ainda.
- ⏳ Próximos passos: a definir com o mentor técnico.
