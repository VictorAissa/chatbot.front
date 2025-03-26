const AboutPage = () => {
    return (
        <div
            className="w-full h-screen bg-cover bg-center bg-no-repeat flex flex-col p-8"
            style={{
                backgroundImage:
                    "url('/mads-schmidt-rasmussen-6YmzwamGzCg-unsplash.webp')",
            }}
        >
            <h1 className="text-3xl font-bold">About</h1>
            <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Tempore voluptatibus, dignissimos harum iusto accusamus dolorem
                natus laborum architecto, eius aperiam qui repellendus libero,
                recusandae autem molestiae maxime impedit labore omnis.
            </p>
        </div>
    );
};

export default AboutPage;
