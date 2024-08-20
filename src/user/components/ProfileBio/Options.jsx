import Button from "../../../shared/components/Ui/Button";

export default function Options() {
    return (
        <div className="flex items-center gap-x-5 text-gray-900 dark:text-white">
            <div>
                <span className="mr-1 font-bold text-lg">@veselinsevo</span>
            </div>
            <div>
                <Button variant="primary">Primary Button</Button>
            </div>
        </div>
    );
}
