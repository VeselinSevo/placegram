const importAllIcons = () => {
    // Import both SVG and PNG files
    const icons = import.meta.glob("../../assets/icons/tag-icons/*.{png,svg}", {
        eager: true,
    });
    const iconMap = {};

    for (const path in icons) {
        const iconName = path
            .split("/")
            .pop()
            .replace(/\.(png|svg)$/, ""); // Get the file name without extension
        iconMap[iconName] = icons[path].default; // Capitalize and append 'Icon'
    }

    return iconMap;
};

const icons = importAllIcons();

export default icons;
