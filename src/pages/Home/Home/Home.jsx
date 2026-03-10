import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import BenefitedPerson from "../../../components/Shared/BenefitedPerson/BenefitedPerson";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | TaskFlow</title>
            </Helmet>
            <Banner></Banner>
            <div className="mt-5 mb-9">
                <h3 className="text-3xl font-bold text-center mb-14">Who Benefited from TaskFlow</h3>
                <BenefitedPerson></BenefitedPerson>
            </div>
        </div>
    );
};

export default Home;