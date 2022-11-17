import { PrismaClient } from '@prisma/client'
import { join } from '@prisma/client/runtime'

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'JoJo',
            email: 'jo.jo@gmail.com',
            avatarurl: 'https://github.com/kingban00.png',
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: 'Example pool',
            code: 'BOL123',
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id
                }
            }
        }

    })

    await prisma.game.create({
        data:{
            date: '2022-11-24T15:00:00.485Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'DE',
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-25T13:00:00.485Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'AR',

            guesses:{
                create: {
                    firstTeamGoals: 4,
                    secondTeamGoals: 1,
                    
                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id,
                            }
                        }
                    }
                }
            }
        }


    })

    // const participant = await prisma.participant.create({
    //     data: {
    //         userId: user.id,
    //         poolId: pool.id,
    //     }
    // })
}

main()