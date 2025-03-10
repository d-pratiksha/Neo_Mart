
'use client'

import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Label} from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Profile() {

  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };


  return (
    <div>
        <Header />
        <div className="grid grid-cols-[2fr_5fr] bg-white min-h-screen ">
        <Card className="bg-[#FAFAFA] w-[350px] mx-[30px] my-[30px]">
          <div>
            <Image
            className="justify-center mx-auto"
              alt="profile"
              src="/images/profile.png"
              width={200}
              height={200}
            />
          <CardTitle className="px-6 text-center">{user.name}</CardTitle>
          <CardDescription className="px-6 py-2 text-center">{user.email}</CardDescription>
        
          </div>
          <div className="grid w-full items-center gap-10 my-2">
            <div className="flex flex-col px-5">
              <Button>Account Info</Button>
            </div>
            <div className="flex flex-col px-5">
              <Button>My Orders</Button>
            </div>
            <div className="flex flex-col px-5">
              <Button>My Addresses</Button>
            </div>
            <div className="flex flex-col px-5 mb-2">
              <Button>Change password</Button>
            </div>
            <div className="flex flex-col px-5 mb-2">
              <Button onClick={()=>router.push('/contact')}>My Contacts</Button>
            </div>
            <div className="flex flex-col px-5 mb-2">
              <Button  variant="destructive" onClick={handleLogout} disabled={isLoading}>
                  {isLoading ? "Logging Out..." : "Logout"}</Button>
            </div>
            
          </div>
        </Card>
        
        <div  className="bg-white min-h-screen ">
          <Card className="bg-[#FAFAFA] w-[1055px] mx-[30px] my-[30px]">
            <CardTitle className= "text-xl mx-[30px] my-[30px]">Account Info</CardTitle>
            <CardContent>
              <div className="grid w-full items-center gap-4 px-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="First name">First Name</Label>
                    <Input id="firstname" placeholder="First name" />
                  </div>
                  <div>
                    <Label htmlFor="Last name">Last Name</Label>
                    <Input id="lastname" placeholder="Last name" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="Email address">Email address</Label>
                  <Input id="email" placeholder="Email address" />
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="Phone no.">Phone no.</Label>
                  <Input id="phoneno" placeholder="Phone number" />
                </div>
              </div>
            </CardContent>
          
            <CardFooter className="flex justify-between">
              <Button className="w-[120px] h-[50px] px-5">Save</Button>
            </CardFooter>
          </Card>

        </div>
      </div>
    </div>   
    
  );
}

// will use later for logout on header and profile page

// fetch('/logout', { method: 'POST' })
//   .then(response => response.json())
//   .then(data => {
//     console.log(data.message); // "Logged out successfully"
//     window.location.href = data.redirectTo; // Redirect to the home page
//   })
//   .catch(error => {
//     console.error('Logout failed:', error);
//   });