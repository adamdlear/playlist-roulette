import { GameCodeForm } from "@/components/landing/code-form";

const Landing = () => {
    return (
        <>
            <div className="py-6 flex flex-col text-center items-center">
                <h1>Playlist Roulette</h1>
                <div>
                    <h2>Join a Party</h2>
                    <GameCodeForm />
                </div>
                <p>or</p>
                <div>
                    <h2>Create your Own</h2>
                </div>
            </div>
        </>
    );
};

export default Landing;
