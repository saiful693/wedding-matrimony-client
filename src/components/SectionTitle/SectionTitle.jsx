

const SectionTitle = ({ mainHeading, subHeading }) => {
    return (
        <div className="mx-auto text-center space-y-4 md:w-3/4 my-8">
            <h3 className="text-3xl text-indigo-800 font-semibold uppercase ">{mainHeading}</h3>
            <p className="text-[#6d6e6f] text-xl  mb-2">{subHeading}</p>
        </div>
    );
};

export default SectionTitle;