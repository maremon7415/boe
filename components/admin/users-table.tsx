"use client";

import { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import toast from "react-hot-toast";
import { Pencil, Trash2, Loader2, Save, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserStats {
    totalMatch: number;
    win: number;
    draw: number;
    loss: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDiff: number;
    points: number;
    form: string[];
}

interface User {
    _id: string;
    fullName: string;
    email: string;
    role: string;
    clubId?: string;
    efootballId?: string;
    avatar?: string;
    stats?: UserStats;
}

interface UsersTableProps {
    roleFilter?: string;
    title: string;
}

export function UsersTable({ roleFilter, title }: UsersTableProps) {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [formString, setFormString] = useState("");

    const showStats = roleFilter === 'player' || roleFilter === undefined;

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const query = roleFilter ? `?role=${roleFilter}` : "";
            const res = await fetch(`/api/admin/users${query}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();

            if (res.ok) {
                setUsers(data);
            } else {
                toast.error(data.error || "Failed to load users.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Network error: Could not connect to server.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [roleFilter]);

    const handleEdit = (user: User) => {
        setEditingUser({
            ...user,
            stats: user.stats || {
                totalMatch: 0,
                win: 0,
                draw: 0,
                loss: 0,
                goalsFor: 0,
                goalsAgainst: 0,
                goalDiff: 0,
                points: 0,
                form: [],
            },
        });
        setFormString(user.stats?.form?.join(",") || "");
        setIsDialogOpen(true);
    };

    const handleStatChange = (key: keyof UserStats, value: any) => {
        if (!editingUser) return;
        setEditingUser((prev) => {
            if (!prev) return null;
            return {
                ...prev,
                stats: {
                    ...prev.stats!,
                    [key]: value,
                },
            };
        });
    };

    const handleSave = async () => {
        if (!editingUser) return;

        // Convert form string back to array
        const updatedForm = formString
            .split(",")
            .map((s) => s.trim().toUpperCase())
            .filter((s) => ["W", "D", "L"].includes(s));

        const userToSave = {
            ...editingUser,
            stats: {
                ...editingUser.stats!,
                form: updatedForm,
            },
        };

        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`/api/admin/users/${editingUser._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(userToSave),
            });

            if (res.ok) {
                toast.success("User updated successfully");
                setIsDialogOpen(false);
                fetchUsers();
            } else {
                const err = await res.json();
                toast.error(err.error || "Failed to update user");
            }
        } catch (error) {
            toast.error("Failed to update user");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;

        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`/api/admin/users/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.ok) {
                toast.success("User deleted successfully");
                fetchUsers();
            } else {
                const err = await res.json();
                toast.error(err.error || "Failed to delete user");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete user");
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{title}</h2>
                <Button onClick={fetchUsers} variant="outline" size="sm">
                    Refresh
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            ) : (
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                {showStats && (
                                    <>
                                        <TableHead className="text-center">P</TableHead>
                                        <TableHead className="text-center">W</TableHead>
                                        <TableHead className="text-center">D</TableHead>
                                        <TableHead className="text-center">L</TableHead>
                                        <TableHead className="text-center font-bold">Pts</TableHead>
                                    </>
                                )}
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={showStats ? 8 : 4} className="text-center h-24">
                                        No users found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                users.map((user) => (
                                    <TableRow key={user._id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={user.avatar} />
                                                    <AvatarFallback>{user.fullName.slice(0, 2).toUpperCase()}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-medium">{user.fullName}</div>
                                                    <div className="text-xs text-muted-foreground">{user.clubId || "No ID"}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-semibold ${user.role === "PENDING"
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : user.role === "ADMINISTRATOR"
                                                            ? "bg-red-100 text-red-800"
                                                            : user.role === "ADMIN"
                                                                ? "bg-orange-100 text-orange-800"
                                                                : "bg-green-100 text-green-800"
                                                    }`}
                                            >
                                                {user.role}
                                            </span>
                                        </TableCell>
                                        {showStats && (
                                            <>
                                                <TableCell className="text-center">{user.stats?.totalMatch || 0}</TableCell>
                                                <TableCell className="text-center">{user.stats?.win || 0}</TableCell>
                                                <TableCell className="text-center">{user.stats?.draw || 0}</TableCell>
                                                <TableCell className="text-center">{user.stats?.loss || 0}</TableCell>
                                                <TableCell className="text-center font-bold">{user.stats?.points || 0}</TableCell>
                                            </>
                                        )}
                                        <TableCell className="text-right space-x-2">
                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(user)}>
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-destructive"
                                                onClick={() => handleDelete(user._id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}

            {/* Edit Modal */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Edit User: {editingUser?.fullName}</DialogTitle>
                        <DialogDescription>
                            Make changes to user profile, role, or statistics.
                        </DialogDescription>
                    </DialogHeader>

                    {editingUser && (
                        <Tabs defaultValue="info" className="w-full flex-1 overflow-y-auto pr-2">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="info">Info & Role</TabsTrigger>
                                <TabsTrigger value="stats">Player Stats</TabsTrigger>
                            </TabsList>

                            <TabsContent value="info" className="space-y-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="fullName" className="text-right">Name</Label>
                                    <Input
                                        id="fullName"
                                        value={editingUser.fullName}
                                        onChange={(e) => setEditingUser({ ...editingUser, fullName: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="email" className="text-right">Email</Label>
                                    <Input
                                        id="email"
                                        value={editingUser.email}
                                        onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="clubId" className="text-right">Club ID</Label>
                                    <Input
                                        id="clubId"
                                        value={editingUser.clubId || ''}
                                        onChange={(e) => setEditingUser({ ...editingUser, clubId: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="role" className="text-right">Role</Label>
                                    <Select
                                        value={editingUser.role}
                                        onValueChange={(val) => setEditingUser({ ...editingUser, role: val })}
                                    >
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select Role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="PENDING">PENDING</SelectItem>
                                            <SelectItem value="MEMBER">MEMBER</SelectItem>
                                            <SelectItem value="CAPTAIN">CAPTAIN</SelectItem>
                                            <SelectItem value="ADMIN">ADMIN</SelectItem>
                                            <SelectItem value="ADMINISTRATOR">ADMINISTRATOR</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </TabsContent>

                            <TabsContent value="stats" className="space-y-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Matches Played</Label>
                                        <Input
                                            type="number"
                                            value={editingUser.stats?.totalMatch}
                                            onChange={(e) => handleStatChange("totalMatch", parseInt(e.target.value))}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Points</Label>
                                        <Input
                                            type="number"
                                            value={editingUser.stats?.points}
                                            onChange={(e) => handleStatChange("points", parseInt(e.target.value))}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Wins</Label>
                                        <Input
                                            type="number"
                                            value={editingUser.stats?.win}
                                            onChange={(e) => handleStatChange("win", parseInt(e.target.value))}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Draws</Label>
                                        <Input
                                            type="number"
                                            value={editingUser.stats?.draw}
                                            onChange={(e) => handleStatChange("draw", parseInt(e.target.value))}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Losses</Label>
                                        <Input
                                            type="number"
                                            value={editingUser.stats?.loss}
                                            onChange={(e) => handleStatChange("loss", parseInt(e.target.value))}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Goals For</Label>
                                        <Input
                                            type="number"
                                            value={editingUser.stats?.goalsFor}
                                            onChange={(e) => handleStatChange("goalsFor", parseInt(e.target.value))}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Goals Against</Label>
                                        <Input
                                            type="number"
                                            value={editingUser.stats?.goalsAgainst}
                                            onChange={(e) => handleStatChange("goalsAgainst", parseInt(e.target.value))}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Goal Diff</Label>
                                        <Input
                                            type="number"
                                            value={editingUser.stats?.goalDiff}
                                            onChange={(e) => handleStatChange("goalDiff", parseInt(e.target.value))}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Form (comma separated, e.g. W,D,L)</Label>
                                    <Input
                                        value={formString}
                                        onChange={(e) => setFormString(e.target.value)}
                                        placeholder="W,L,D,W,W"
                                    />
                                    <p className="text-xs text-muted-foreground">Recent match results.</p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    )}

                    <DialogFooter className="mt-4">
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSave} className="gap-2">
                            <Save className="h-4 w-4" /> Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
