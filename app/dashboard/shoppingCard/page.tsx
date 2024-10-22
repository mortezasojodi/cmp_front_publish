import ShoppingCard from '@/components/dashboard/shoppingCard/shoppingCard'
import Title from '@/components/forms/title/title'
import TitleBack from '@/components/forms/title/title_back'

export default function ShoppingCardPage() {
    return (
        <div className="pagecontent">
            <TitleBack title={'Shopping Card'} icon={"/broom.svg"} />
            <ShoppingCard />
        </div>
    )
}
