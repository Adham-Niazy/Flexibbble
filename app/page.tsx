import { Categories } from "@/components/UI";
import { Projects } from "@/components/sections";

type SearchParams = {
  category?: string | null
}

type Props = {
  searchParams: SearchParams
}

const Home = ({ searchParams: { category } }: Props) => {
  return (
    <section className="flex-start flex-col paddings mb-16">
      <Categories />
      <Projects category={category}/>
      <h1>LoadMore</h1>
    </section>
  )
}

export default Home;