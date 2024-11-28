'use client';

import {Heart, MapPin, Phone, Search, ShoppingCart} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import {Button} from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {Input} from '@/components/ui/input';
import {cn} from '@/lib/utils';
import axios from 'axios';

export default function Component() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);

    const userToken = localStorage.getItem('userToken');
    const adminToken = localStorage.getItem('adminToken');

    if (userToken || adminToken) {
      setIsLoggedIn(true);
      setIsAdmin(!!adminToken);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      const userToken = localStorage.getItem('userToken');
      const adminToken = localStorage.getItem('adminToken');

      let apiUrl =
        'https://mission-shakti-419920.el.r.appspot.com/api/user/logout';
      if (userToken) localStorage.removeItem('userToken');
      if (adminToken) localStorage.removeItem('adminToken');

      await axios.post(apiUrl, null, {
        headers: {
          Authorization: `Bearer ${userToken || adminToken}`,
        },
      });

      setIsLoggedIn(false);
      setIsAdmin(false);
      window.location.href = '/';
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-200',
        isScrolled ? 'shadow-md' : 'shadow-none',
      )}
    >
      {/* Top Bar */}
      <div className="hidden border-b bg-[#FDF7F0] px-4 py-2 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            Store Location: KIIT Millet Cafe, Campus 3, KIIT, Patia
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  Eng
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Hindi</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  INR
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>INR</DropdownMenuItem>
                <DropdownMenuItem>USD</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {!isLoggedIn ? (
              <Link href="/signup">
                <Button variant="ghost" size="sm">
                  Sign In / Sign Up
                </Button>
              </Link>
            ) : (
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b bg-[#FDF7F0] px-4 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-12">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/ShaktiSaathihorizontaleng.svg"
              alt="Shakti Saathi"
              width={120}
              height={40}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link
              href="/shop"
              className="text-muted-foreground hover:text-black"
            >
              Shop
            </Link>
            <Link
              href="/forum"
              className="text-muted-foreground hover:text-black"
            >
              Forum
            </Link>
            <Link
              href="/cart/track"
              className="text-muted-foreground hover:text-black"
            >
              Track
            </Link>
            <Link
              href="/blog"
              className="text-muted-foreground hover:text-black"
            >
              Blog
            </Link>
            <Link
              href="/chat"
              className="text-muted-foreground hover:text-black"
            >
							Chat
            </Link>
            {isAdmin && (
              <>
                <Link
                  href="/products"
                  className="text-muted-foreground hover:text-black"
                >
                  Products
                </Link>
                <Link
                  href="/analytics"
                  className="text-muted-foreground hover:text-black"
                >
                  Analytics
                </Link>
              </>
            )}
          </nav>

          {/* Search Input */}
          <div className="hidden flex-1 items-center gap-2 lg:flex">
            <Input
              type="search"
              placeholder="Search"
              className="max-w-md flex-1"
            />
            <Button className="bg-[#588157] hover:bg-[#588157]/90">
              Search
            </Button>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#588157] text-xs text-white">
                  2
                </span>
                <span className="sr-only">Shopping Cart</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
