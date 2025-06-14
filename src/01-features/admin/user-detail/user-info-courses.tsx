import { GraduationCap, BookOpen } from "lucide-react"
import CourseCard, { CourseCardSkeleton } from "../courses-list/course-card"
import { Card } from "@/02-components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/02-components/ui/tabs"
import { Badge } from "@/02-components/ui/badge"
import { useParams } from "react-router"
import { Button } from "@/02-components/ui/button"
import { Skeleton } from "@/02-components/ui/skeleton"
import { GenerateId } from "@/05-model/base/BaseEntity"
import { courseEnrollmentService } from "@/03-http/expanded/course-enrollment-service"
import { CourseEnrollmentInfoForUser } from "@/05-model/base/Course"
import { createSkeletonArray, skeletonUniqueId } from "@/02-components/utils/misc"
import useBaseComponent from "@/04-hooks/use-base-component"

const UserInfoCourses = () => {

	const { userId } = useParams();

	const {
		query: { data: enrollments = [] as CourseEnrollmentInfoForUser[] },
		onAdd,
		onDelete,
		isLoading
	} = useBaseComponent<CourseEnrollmentInfoForUser, CourseEnrollmentInfoForUser[]>({
		queryKey: ["enrollments", userId],
		fetch: () => courseEnrollmentService.getCourseEnrollmentInfo(userId!),
		add: courseEnrollmentService.addCourseEnrollmentInfo,
		del: courseEnrollmentService.deleteCourseSection,
		equals: courseEnrollmentService.sameItem
	})

	const enrolledCourses = enrollments.filter(enrollment => enrollment.userSubscription);
	const enrollableCourses = enrollments.filter(enrollment => enrollment.courseWithSubscriptions.course.status !== "Chiuso" && !enrollment.userSubscription);

	// Se già iscritto, faccio un unsubscribe, altrimenti un subscribe
	const handleSubscribe = async (enrollment: CourseEnrollmentInfoForUser) => {
		if (enrolledCourses.includes(enrollment)) {
			await unsubscribe(enrollment);
		}
		else {
			await subscribe(enrollment);
		}
	}

	const subscribe = async (enrollment: CourseEnrollmentInfoForUser) => {
		const existingEnrollment = enrollments.find(e => e.courseWithSubscriptions.course.id === enrollment.courseWithSubscriptions.course.id);
		if (!existingEnrollment) {
			return;
		}

		onAdd({
			courseWithSubscriptions: enrollment.courseWithSubscriptions,
			userSubscription: {
				id: GenerateId(),
				userId: userId!,
				courseId: enrollment.courseWithSubscriptions.course.id,
				subscriptionDate: new Date().toISOString(),
				grade: null
			}
		});
	}

	const unsubscribe = async (enrollment: CourseEnrollmentInfoForUser) => {
		const userSubscription = enrollments.find(e => e.userSubscription?.id === enrollment.userSubscription!.id)?.userSubscription;
		if (!userSubscription) {
			return;
		}
		onDelete(enrollment);
	}

	const subscribeFooter = (buttonText: string, enrollment: CourseEnrollmentInfoForUser) => (
		<Button
			variant={"outline"}
			className="w-full"
			onClick={() => handleSubscribe(enrollment)}
			disabled={enrollment.courseWithSubscriptions.course.status === "Chiuso"}
		>
			{buttonText}
		</Button>
	)

	if (isLoading)
		return <UserInfoCoursesSkeleton />;

	return (
		<Tabs defaultValue="subscribed" className="w-full mt-8">
			<TabsList className="grid w-full grid-cols-2">
				<TabsTrigger value="subscribed" className="cursor-pointer">
					Iscrizioni
					<Badge
						variant="secondary"
						className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/30"
					>
						{enrolledCourses.length}
					</Badge>
				</TabsTrigger>
				<TabsTrigger value="available" className="cursor-pointer">
					Disponibili
					<Badge
						variant="secondary"
						className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/30"
					>
						{enrollableCourses.length}
					</Badge>
				</TabsTrigger>
			</TabsList>
			<TabsContent value="subscribed">
				{enrolledCourses.length === 0 ? (
					<Card className="flex flex-col items-center justify-center py-12 text-center">
						<GraduationCap className="h-12 w-12 text-muted-foreground mb-4" />
						<p className="text-xl font-semibold text-muted-foreground">Non ci sono iscrizioni</p>
					</Card>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{enrolledCourses.map((enrollment) => (
							<CourseCard key={enrollment.courseWithSubscriptions.course.id} courseWithSubscriptions={enrollment.courseWithSubscriptions} customFooter={subscribeFooter("Rimuovi iscrizione", enrollment)} />
						))}
					</div>
				)}
			</TabsContent>
			<TabsContent value="available">
				{enrollableCourses.length === 0 ? (
					<Card className="flex flex-col items-center justify-center py-12 text-center">
						<BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
						<p className="text-xl font-semibold text-muted-foreground">Non ci sono corsi disponibili</p>
					</Card>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6">
						{enrollableCourses.map((enrollment) => (
							<CourseCard key={enrollment.courseWithSubscriptions.course.id} courseWithSubscriptions={enrollment.courseWithSubscriptions} customFooter={subscribeFooter("Iscrivi", enrollment)} />
						))}
					</div>
				)}
			</TabsContent>
		</Tabs>
	)
}
export default UserInfoCourses

const UserInfoCoursesSkeleton = () => {
	return (
		<Tabs defaultValue="subscribed" className="w-full mt-8">
			<TabsList className="grid w-full grid-cols-2">
				<Skeleton className="h-4 w-20" />
				<Skeleton className="h-4 w-20" />
			</TabsList>
			<TabsContent value="subscribed">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{
						createSkeletonArray(4).map(() => (
							<CourseCardSkeleton key={skeletonUniqueId()} />
						))
					}
				</div>
			</TabsContent>
		</Tabs>
	)
}
export { UserInfoCoursesSkeleton };