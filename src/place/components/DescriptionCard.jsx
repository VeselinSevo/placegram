import Card from "../../shared/components/Ui/Card";

const DescriptionCard = ({ description }) => {
    return (
        <Card customClasses="p-4 bg-bg dark:bg-bg-dark border border-hover dark:border-hover-dark shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-text dark:text-text-dark">{description}</p>
        </Card>
    );
};

export default DescriptionCard;
