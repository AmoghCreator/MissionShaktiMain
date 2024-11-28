import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import {
  Facebook,
  Instagram,
  PinIcon as Pinterest,
  Twitter,
} from 'lucide-react';

export default function Component() {
  return (
    <footer className="w-full">
      {/* Brand Logos */}
      
      
      {/* Newsletter Section */}
      <div className="container mx-auto px-4 py-12 bg-[#fdf9f6]">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-semibold mb-4">
            Subscribe our Newsletter
          </h3>
          <p className="text-muted-foreground mb-6">
            Pellentesque eu nibh eget mauris congue mattis mattis nec tellus.
            Phasellus imperdiet elit eu magna.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto mb-6">
            <Input
              type="email"
              placeholder="Your email address"
              className="flex-1"
            />
            <Button className="bg-[#8ab660] hover:bg-[#7aa550] text-white">
              Subscribe
            </Button>
          </div>
          <div className="flex justify-center gap-4">
            <Link
              href="#"
              className="p-2 rounded-full bg-[#8ab660] text-white hover:bg-[#7aa550]"
            >
              <Facebook className="w-5 h-5" />
            </Link>
            <Link
              href="#"
              className="p-2 rounded-full bg-[#8ab660] text-white hover:bg-[#7aa550]"
            >
              <Twitter className="w-5 h-5" />
            </Link>
            <Link
              href="#"
              className="p-2 rounded-full bg-[#8ab660] text-white hover:bg-[#7aa550]"
            >
              <Pinterest className="w-5 h-5" />
            </Link>
            <Link
              href="#"
              className="p-2 rounded-full bg-[#8ab660] text-white hover:bg-[#7aa550]"
            >
              <Instagram className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-[#2a2416] text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <Image
                src="/ShaktiSaathiHorizontalLightBGEng.svg"
                height={512}
                width={512}
                alt="Shakti Saathi logo"
                className="mb-4"
              />
              <p className="text-gray-400 mb-4">
                Morbi cursus porttitor enim lobortis molestie. Duis gravida
                turpis dui, eget bibendum magna congue nec.
              </p>
              <div className="flex items-center gap-2 text-gray-400">
                <span>(219) 555-0114</span>
                <span>or</span>
                <Link
                  href="mailto:Proxy@gmail.com"
                  className="hover:text-white"
                >
                  Proxy@gmail.com
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">My Account</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/cart/track" className="hover:text-white">
                    Order History
                  </Link>
                </li>
                <li>
                  <Link href="/cart" className="hover:text-white">
                    Shopping Cart
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Helps</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Faqs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Terms & Condition
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Fruit & Vegetables
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Meat & Fish
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Bread & Bakery
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Beauty & Health
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              Shakti-Saathi © 2024. All Rights Reserved
            </p>
            
          </div>
        </div>
      </div>
    </footer>
  );
}
