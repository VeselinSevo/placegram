import Option from "../../../shared/components/ui/Option";

export default function ProfilePhotoOptions(props) {
    const OPTIONS = [
        {
            text: "Upload Photo",
            onClick: () => console.log("Upload photo clicked"),
            style: "primary",
        },
        {
            text: "Remove Current Photo",
            onClick: () => console.log("Remove photo clicked"),
            style: "danger",
        },
        {
            text: "Cancel",
            onClick: () => props.onClose(),
        },
    ];
    console.log(props);
    return (
        <div className="rounded-lg overflow-hidden">
            {OPTIONS.map((option, index) => (
                <Option
                    key={index}
                    optionText={option.text}
                    style={option.style}
                    onClick={() => {
                        option.onClick();
                    }}
                    isLast={index === OPTIONS.length - 1}
                />
            ))}
        </div>
    );
}
