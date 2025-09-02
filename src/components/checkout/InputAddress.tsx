interface Props{
    register: any;
    errors: any;

    name: keyof any;
    className?: string;
    placeholder: string;
}

export const InputAddress = ({register,errors,name,className,placeholder}: Props) => {
  return (
    <div>InputAddress</div>
  )
}
