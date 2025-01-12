import { GameCodeForm } from "@/components/landing/code-form";
import { CreatePartyButton } from "@/components/landing/create-party-button";

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
                    <CreatePartyButton />
                </div>
            </div>
        </>
    );
};

export default Landing;
