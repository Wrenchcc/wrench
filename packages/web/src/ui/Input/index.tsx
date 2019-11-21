import { Base } from './styles'

function Input({ placeholder, onChangeText, text = 'text', ...rest }) {
  const onChangeHandler = evt => onChangeText(evt.target.value)

  return <Base placeholder={placeholder} type={text} {...rest} onChange={onChangeHandler} />
}

export default Input
