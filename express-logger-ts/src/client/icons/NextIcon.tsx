import clsx from "clsx"

type Props = {
    rotate?: boolean
}

export const NextIcon = ({rotate} : Props) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className={clsx(rotate && "rotate_180")}><path d="M21 12l-18 12v-24z"/></svg>
}
