import React from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { AuthUser } from '@supabase/supabase-js'

interface DashboardSetupProps {
    subscription: {} | null;
    user: AuthUser;
}

const DashboardSetup: React.FC<DashboardSetupProps> = ({ subscription, user }) => {
    return (
        <Card className='w-[800px] h-screen sm:h-auto ' >
            <CardHeader>
                <CardTitle>Create Workspace</CardTitle>
                <CardDescription>Continue to create your own private workspace</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className='flex flex-col gap-4'></div>
                </form>
            </CardContent>
        </Card >

    )
}

export default DashboardSetup