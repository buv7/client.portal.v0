import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Users, Zap } from "lucide-react"

export function ProfileCard() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src="/fitness-user-profile.jpg" />
            <AvatarFallback className="bg-accent text-accent-foreground text-lg">AJ</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h3 className="font-semibold text-lg">Alex Johnson</h3>
            <p className="text-sm text-muted-foreground">Premium Client</p>

            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="text-xs">
                <Users className="w-3 h-3 mr-1" />
                Coach: Sarah M.
              </Badge>
            </div>

            <div className="flex items-center gap-4 mt-3 text-sm">
              <div className="flex items-center gap-1">
                <Zap className="w-4 h-4 text-accent" />
                <span>12 Day Streak</span>
              </div>
              <div className="text-muted-foreground">Rank: Gold</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
