import { Button as Btn, Text } from 'native-base'

interface Props {
    title: String
}

const Button = ({ title } : Props) =>{
    return (
        <Btn>
            {title}
       </Btn>
    )
}

export default Button