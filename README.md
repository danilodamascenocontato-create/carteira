# Dashboard da carteira de ações

Dashboard web responsivo, com estilo profissional escuro e endpoint de cotações protegido no servidor.

## Dados importados da planilha
- CXSE3: 700 ações | R$ 14.280
- BBSE3: 451 ações | R$ 14.861
- CMIN3: 2.710 ações | R$ 12.547
- BRAP4: 442 ações | R$ 8.013
- VALE3: 75 ações | R$ 4.670
- BRKM5: 1.142 ações | R$ 3.585
- TAEE3: 79 ações | R$ 1.090
- BBDC3: 38 ações | R$ 508
- BBAS3: 9 ações | R$ 135 (quantidade corrigida pelo usuário)

A soma dos valores individuais é R$ 59.689. A planilha exibia R$ 61.720 como total geral; o dashboard usa a soma das linhas individuais.

## Publicar na Vercel
1. Extraia o ZIP.
2. Crie um repositório no GitHub e envie os arquivos `index.html`, `api/quotes.js` e `vercel.json`.
3. Na Vercel, importe esse repositório como projeto.
4. Em **Settings > Environment Variables**, crie `BRAPI_TOKEN` com uma NOVA chave da brapi.
5. Faça o deploy. O endereço `*.vercel.app` será o endereço do painel.
6. Abra o endereço e clique em **Atualizar cotações**.

## Segurança da chave
Não coloque token no `index.html`, no GitHub ou em qualquer arquivo público. Configure somente como variável de ambiente `BRAPI_TOKEN` na hospedagem. Como a chave anterior foi compartilhada na conversa, revogue-a/rotacione-a no painel da brapi e use uma nova.

## Desenvolvimento local
O projeto usa uma função serverless da Vercel. Para testar localmente, instale Node.js e Vercel CLI e execute:
`vercel dev`
Defina `BRAPI_TOKEN` no ambiente antes de iniciar.

## Cotações
O painel consulta a brapi pelo endpoint server-side. A disponibilidade, atraso e limites dependem do plano contratado na brapi. O painel não promete cotação em tempo real.
