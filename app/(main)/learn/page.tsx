import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Header } from "./_components/header";
import { UserProgress } from "@/components/user-progress";
import { getCourseProgress, getLessonPercentage, getUnits, getUserProgress, getUserSubscription } from "@/db/queries";
import { redirect } from "next/navigation";
import { Unit } from "./unit";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";

const LearnPage = async () => {
    const userProgressData = getUserProgress();
    const unitsData = getUnits();
    const courseProgressData = getCourseProgress();
    const lessonPercentageData = getLessonPercentage();
    const userSubscriptionData = getUserSubscription();

    const [
        userProgress,
        units,
        courseProgress,
        lessonPercentage,
        userSubscription,
    ] = await Promise.all([
        userProgressData,
        unitsData,
        courseProgressData,
        lessonPercentageData,
        userSubscriptionData,
    ]);

    // console.log(userSubscription?.isActive)
    if(!userProgress || !userProgress?.activeCourse){
        redirect("/courses");
    }

    if(!courseProgress){
        redirect("/courses");
    }

    const isPro = !!userSubscription?.isActive;

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress
                    activeCourse={userProgress.activeCourse}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                    hasActiveSubscription={!!userSubscription?.isActive}
                />
                {!isPro && <Promo />}
                <Quests points={userProgress.points}/>
            </StickyWrapper>
            <FeedWrapper>
                <Header title={userProgress.activeCourse.title} />
                {units.map((unit) => (
                    <div key={unit.id}>
                        <Unit
                            id={unit.id}
                            order={unit.order}
                            description={unit.description}
                            title={unit.title}
                            lessons={unit.lessons}
                            activeLesson={courseProgress.activeLesson}
                            activeLessonPercentage={lessonPercentage}
                        />
                    </div>
                ))}
            </FeedWrapper>
        </div>
    )
}

export default LearnPage;