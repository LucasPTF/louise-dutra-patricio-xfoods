# Workshop Mesa Sem Veto

Página de vendas criada para Louise Dutra Patricio e para a marca XFoods. O projeto apresenta o Workshop Mesa Sem Veto, uma experiência online e ao vivo para donos de restaurantes, gestores, chefs, hamburguerias, lanchonetes e outras operações de alimentação.

## Tecnologias

- React
- TypeScript
- Vite
- CSS responsivo
- Vercel

## Rotas

- `/a1`
- `/a2`
- `/a3`
- `/obrigado`

As três rotas de venda compartilham estrutura, conteúdo, identidade visual, componentes e oferta. Somente a comunicação da hero muda entre elas.

## Execução local

```bash
npm install
npm run dev
```

## Validação

```bash
npm run validate
```

## Build de produção

```bash
npm run build
npm run preview
```

## Checkout

O endereço de checkout deve ser configurado na variável `VITE_CHECKOUT_URL`. Enquanto a variável estiver vazia, o botão final informa que o checkout está em configuração.

```bash
VITE_CHECKOUT_URL=https://endereco-do-checkout.example
```

## Informações operacionais pendentes

- Checkout
- Data e horário do workshop
- Link do grupo de WhatsApp
- Link da transmissão ao vivo
- Contato de suporte
- Política de garantia aplicável ao ingresso
