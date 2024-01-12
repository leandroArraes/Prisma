import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("------------ Main Iciando - connectd ------------")
    console.log("executando")
    // Crud com Prisma
// ---------------- Create usuario -------------------
//    const user = await prisma.user.create({
//         data: {
//             email: "Jasmim@thtc.com",
//             name: "Jasmim",
//             password: "1234"
//         }
//     })

//     console.dir(user, {depth: null})
// }

// --------------- delete usuario -------------------
// const userDeleted = await prisma.user.delete({
//     where: {
//         id: "67bc52e0-c4c5-45e1-97fa-f8059e72fda6"
//     }
// })

//     console.dir(userDeleted, {depth: null})

// ---------------- update usuario -------------------
//  const userUpdate = await prisma.user.update({
//     where:{
//         id: "0d341af6-3c5d-4383-bb37-8ac5a403e45b"
//     },
//     data:{
//         email: "leandro@novoEmail.com"
//     }
// })

// ---------------- Leitura de um  usuario -------------------
// const leandro = await prisma.user.findUnique({
//     where:{
//         id: "0d341af6-3c5d-4383-bb37-8ac5a403e45b"
//     }
// })

// console.dir(leandro, {depth: null})

// ---------------- Listando posts do usuario -------------------
// const users = await prisma.user.findMany({
//     include:{
//         posts: true,
//         profile: true
//     }
// })
// console.dir(users, {depth: null})


// ---------------- Buscas usando select -------------------

// const busca = await prisma.user.findMany({
//     select:{
//         email: true
//     }
// })
// console.log(busca);
// ---------------- Criando relacionamentos -------------------

// const leandro = await prisma.user.create({
//     data:{
//         name:"Leandro Arraes",
//         email:"leandroArraes@thtc.com",
//         password: "1234",
//         profile:{
//             create:{
//                 info:"Ola Mundo",
//                 role:"admin",
//             }
//         },
//         posts:{
//             create:{
//                 title:"Agora foi",
//                 content:"Ola Mundo",
//                 published: true
//             }
//         }
// }})
//console.dir(leandro, {depth: null})

// --------------- Deletando com relacionamento -------------------


    apagarUsusario('67bc52e0-c4c5-45e1-97fa-f8059e72fda6');


// ------- função para mostrar todos os usuarios --------------
// const MostrarTodosUsuarios = await prisma.user.findMany();
// console.dir(MostrarTodosUsuarios, {depth: null})

// --------- Usando filtros --------------------
// const users = await prisma.user.findMany(
//     {where: {name: {contains: "leandro"}}}
// );

//     console.dir(users, {depth: null})



}

async function apagarUsuario(ids: string) {
    try {
      // Excluir posts relacionados
      await prisma.post.deleteMany({
        where: {
          authorId: ids,
        },
      });
  
      // Excluir perfil relacionado
      await prisma.profile.delete({
        where: {
          userId: ids,
        },
      });
  
      // Excluir usuário
      await prisma.user.delete({
        where: {
          id: ids,
        },
      });
  
      console.log("Usuário deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      // Tratar o erro, por exemplo, enviando uma notificação ou registrando no log
    }
  }

main().then(async(e)=>{
    await prisma.$disconnect();
    console.log("Disconectar")
}).catch(async(e)=>{
    console.log(e)
    await prisma.$disconnect();
    console.log("Disconectar")
    process.exit(1)
})