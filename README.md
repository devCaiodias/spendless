# 💰 SpendLess

Controle suas finanças pessoais com facilidade e clareza. O **SpendLess** é um aplicativo web desenvolvido com foco na organização financeira, permitindo que você registre, visualize e analise suas receitas e despesas de forma intuitiva.

## 🚀 Demonstração

<img src="https://i.pinimg.com/1200x/8a/2a/27/8a2a27547d179514ecc6101645c3f4f4.jpg" height="400px" />

## 🧠 Funcionalidades

- Adição de transações (despesas ou receitas)
- Seleção de tipo: **Income** (receita) ou **Expense** (despesa)
- Visualização total de receitas e despesas
- Gráficos de pizza para análise visual de gastos por categoria
- Autenticação de usuário com Supabase
- Feedback visual ao salvar transações

## 🛠️ Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) – framework React moderno
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) + [ShadCN UI](https://ui.shadcn.com/)
- [Supabase](https://supabase.com/) – autenticação e banco de dados

## 📦 Instalação Local

1. Clone o repositório:


```bash
# Clone o repositório
git clone https://github.com/seu-usuario/spendless.git
cd spendless

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local

# Insira as chaves do Supabase no arquivo .env.local
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# Rode o projeto
npm run dev
```


Abra [http://localhost:3000](http://localhost:3000) com o seu navegador e veja o resultado.

🧪 Banco de Dados
A tabela transactions no Supabase deve ter os seguintes campos:

| Campo       | Tipo   | Observação                          |
|-------------|--------|-------------------------------------|
| `id`        | UUID   | Primary Key                         |
| `user_id`   | UUID   | Referência ao usuário Supabase      |
| `description` | Text  |                                     |
| `amount`    | Decimal|                                     |
| `category`  | Text   |                                     |
| `date`      | Date   |                                     |
| `type`      | Text   | Deve ser `income` ou `expense`      |

💡 Certifique-se de criar uma check constraint no campo type:

```sql
ALTER TABLE transactions
ADD CONSTRAINT transactions_type_check CHECK (type IN ('income', 'expense'));
```

## Observações

 - As transações são salvas por usuário (via Supabase Auth).

 - O projeto usa SSR e revalidação automática com a função onTransactionSaved.

## Aprendizados

  -  Durante esse projeto, pude aprofundar meus conhecimentos em:

  -  SSR/CSR no Next.js

  -  Uso de Supabase como backend serverless

  -  Manipulação de estado entre componentes

  -  Boas práticas de UX com feedbacks visuais
