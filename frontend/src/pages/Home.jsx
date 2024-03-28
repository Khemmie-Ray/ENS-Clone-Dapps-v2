import Header from "../components/Header"
import AvatarUpload from "../components/AvatarUpload"
import Retrieval from "../components/Retrieval"

const Home = () => {
  return (
    <div>
        <Header />
        <section className="h-[70vh] flex flex-col justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
            <h1 className="lg:text-[62px] md:text-[62px] text-[38px] font-black text-center"><span className="text-[#3939b2] drop-shadow-md">Welcome</span> to the <br /> New <span className="text-[#3939b2] drop-shadow-md">Internet </span></h1>
            <button className="bg-[#e6e6e6] text-[#3939b2] px-24 py-4 rounded-full my-8 font-black" >Get Started</button>
        </section>
        <section >
            <div className="text-center">
            <h2 className="lg:text-[58px] md:text-[58px] text-[28px] text-[#3939b2] mt-16 mb-8 font-bold">Your Web3 username in <br />easy steps</h2>
            <p className="text-center lg:w-[50%] md:w-[50%] w-[80%] mx-auto text-[1.1rem]">Getting your Web3 username just got easier than ever. Follow these simple steps to claim your username and stand out in the decentralized world:</p>
            </div>
           <div className="w-[90%] mx-auto my-8">  
            <AvatarUpload />
           </div>
        </section>
        <section className="text-center">
        <h2 className="lg:text-[58px] md:text-[58px] text-[28px] text-[#3939b2] mt-16 mb-8 font-bold">Retrieval made <br />easy</h2>
        <p className="text-center lg:w-[50%] md:w-[50%] w-[80%] mx-auto text-[1.1rem]">Easily translate Ethereum addresses into human-readable names, simplifying interactions and enhancing your Web3 journey.  Try it out!</p>
        <div className="w-[90%] mx-auto my-8">  
            <Retrieval />
           </div>
        </section>
    </div>
  )
}

export default Home