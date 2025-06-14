import GazzaDialog from "@/02-components/ui/dialogs/gazza-dialog";
import { columns } from "./columns"
import { DataTable, DataTableSkeleton } from "./data-table"
import { User, UserState } from "@/05-model/base/User";
import { Button } from "@/02-components/ui/button";
import { Plus } from "lucide-react";
import UserDialog from "@/02-components/ui/dialogs/user-dialog";

interface UsersTableWrapperProps {
	users: UserState[];
	onAddUser: (user: User) => void;
	onEditUser: (user: User) => void;
	onDeleteUser: (user: User) => void;
	loading: boolean
}

export default function UsersTableWrapper({ users, onAddUser, onEditUser, onDeleteUser, loading }: Readonly<UsersTableWrapperProps>) {

	if (loading)
		return (
			<div className="container mx-auto">
				<DataTableSkeleton />
			</div>
		)

	return (
		<div className="container mx-auto">
			<DataTable columns={columns({ onEditUser, onDeleteUser })} data={users}>
				<GazzaDialog dialogComponent={(props) => <UserDialog submit={onAddUser} {...props} />}>
					<Button variant="outline" className="flex items-center gap-1 cursor-pointer">
						<Plus className="h-4 w-4" />
						Aggiungi utente
					</Button>
				</GazzaDialog>
			</DataTable>
		</div>
	)
}
