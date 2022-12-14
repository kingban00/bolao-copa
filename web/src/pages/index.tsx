// interface HomeProps{
//   count: number;
// }

import  Image  from 'next/image'
import appPreviewImg from '../assets/app-nlw-copa-preview.png'
import logoImage from '../assets/logo.svg'
import usersAvatarExampleImg from '../assets/users-avatar-example.png'
import iconCheck from '../assets/icon-check.svg'
import { api } from '../lib/axios'
import { FormEvent, useState } from 'react'

interface HomeProps{
  poolCount: Number;
  userCount: Number;
  guessCount: Number;
}

export default function Home(props: HomeProps) {
  
  const [poolTitle, setPoolTitle] = useState('')

  console.log(poolTitle)

  async function createPool(e: FormEvent){
    e.preventDefault()

    try {
      const response = await api.post('/pools', {
        title: poolTitle,
      })

      const { code } =  response.data 

      await navigator.clipboard.writeText(code)
      alert('Bolão criado com sucesso, o código foi copiado para a área de transferência!')

      setPoolTitle('')

    } catch (err) {
      console.log(err)
      alert('Erro ao criar o bolão, tente novamente!')
    }
  }
  
  return (
    <div className='max-w-[1124px] h-screen mx-auto grid grid-cols-2 items-center gap-28'>
      <main>
        <Image src={ logoImage } alt="Logotipo do site" />
        <h1 className='mt-14 text-white text-5xl font-bold leading-tight'>Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className='mt-10 flex items-center gap-2'>
          <Image src= { usersAvatarExampleImg } alt="" />
          <strong className='text-gray-100 text-xl'>
            <span className='text-ignite-500'>+{ props.userCount }</span> pessoas já estão usando
          </strong>
        </div>
        <form onSubmit={createPool} className='mt-10 flex gap-2'>
          <input onChange={e => setPoolTitle(e.target.value)} value={poolTitle} className='flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100' type="text" required placeholder='Qual o nome do seu bolão?' />
          <button className='bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700' type="submit"> Criar meu bolão</button>
        </form>

        <p className='mt-4 text-sm text-gray-300 leading-relaxed'>Após criar o seu bolão, você receberá um código que poderá usar para convidar outras pessoas 🚀</p>

        <div className='mt-10 pt-10 border-t border-gray-600 flex justify-between text-gray-100 items-center'>
          <div className='flex items-center gap-6'> 
            <Image src={ iconCheck } alt="" /> 
            <div className='flex flex-col'>
              <span className='text-2xl font-bold'>+{ props.poolCount }</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className='w-px h-14 bg-gray-600' />

          <div className='flex items-center gap-6'> 
            <Image src={ iconCheck } alt="" /> 
            <div className='flex flex-col'>
              <span className='text-2xl font-bold'>+{ props.guessCount }</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image
        src={ appPreviewImg } 
        alt="Dois celulares exibindo uma previsa da aplicação móvel" 
        
      />
    </div>
  )
}

export const getServerSideProps = async () => {

  const [poolCountResponse, guessCountResponse, userCountResponse] = await Promise.all([
    await api.get('pools/count'),
    await api.get('guess/count'),
    await api.get('user/count')
  ])


  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count
    }
  }

}
