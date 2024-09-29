import Card from "./Card";

export default function Fallback(props) {
    return (
        <Card
            customClasses="p-7 flex flex-col justify-center text-center items-center gap-3 md:max-w-full"
            disableHover
        >
            {props.children}
        </Card>
    );
}
