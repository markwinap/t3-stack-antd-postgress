# T3 Stack Antd Template

## Setup
### Install Dependencies
```sh
npm install
```

### Run Locally
```sh
npm run dev
```

## Prisma
https://www.prisma.io/docs/reference/api-reference/command-reference


###  Sync DB & generate the TypeScript types (Detecting Changes)
```sh
npx prisma migrate dev --name {commit description}
```
### Same but without migrations
```sh
npx prisma db push
```