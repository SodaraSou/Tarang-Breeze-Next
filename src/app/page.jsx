import UserLayout from './UserLayout'
import FeatureVenue from '@/components/FeatureVenue'
import FeatureSport from '@/components/FeatureSport'
import FeatureTeam from '@/components/FeatureTeam'
import FeatureTournament from '@/components/FeatureTournament'

function HomePage() {
    return (
        <UserLayout>
            <section className="p-4 md:p-10">
                <div className="flex flex-col gap-4 md:gap-10">
                    <div className="bg-white max-w-7xl h-[300px]"></div>
                    <FeatureSport />
                    <FeatureVenue />
                    <FeatureTeam />
                    <FeatureTournament />
                </div>
            </section>
        </UserLayout>
    )
}

export default HomePage
