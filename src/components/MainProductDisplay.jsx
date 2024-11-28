import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Truck,
  HeadphonesIcon,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';

export default function Component() {
  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="grid grid-cols-4 grid-rows-3 gap-4 h-[600px]">
        {/* Hero Section */}
        <Card className="bg-[#8B7355] text-white p-8 col-span-2 row-span-3 relative overflow-hidden">
          <CardContent className="flex flex-col justify-between h-full text-left">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">
                Fresh and Healthy
                <br />
                Millet Products
              </h1>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Sale up to</span>
                  <span className="bg-[#8B4513] px-2 py-1 rounded">
                    30% OFF
                  </span>
                </div>
                <p className="text-sm">Free shipping on all your order.</p>
              </div>
            </div>
            <Link href="/shop">
              <Button
                variant="secondary"
                className="w-fit group w-[200px] h-[60px]"
              >
                Shop now
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </CardContent>
          <div
            className="absolute bottom-0 right-0 w-[400px] h-[600px] bg-transparent"
            aria-hidden="true"
          >
            <Image
              src="/HeroSectionWoman1.png"
              alt="Hero Background"
              fill={true}
              objectFit="cover"
            />
          </div>
        </Card>

        {/* Join Us Card */}
        <Card className="bg-[#00411A] text-white p-6 col-span-2 row-span-2 flex flex-row relative overflow-hidden">
          <CardContent className="flex flex-col justify-between h-full text-left">
            <div className="space-y-4">
              <p className="text-sm uppercase">Want to start your journey ?</p>
              <h2 className="text-3xl font-bold">Join Us!</h2>
              <p className="text-sm">
                Learn all the elements of empowering yourself...
              </p>
            </div>
            <div className="flex justify-between items-end">
              <Link href="/signup">
                <Button variant="secondary" className="group">
                  Explore more
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </CardContent>
          <div
            className="absolute bottom-0 right-0 w-[300px] h-[400px] bg-transparent"
            aria-hidden="true"
          >
            <Image
              src="/HeroSectionWoman2.png"
              alt="Hero Background"
              fill={true}
              objectFit="cover"
            />
          </div>
        </Card>

        {/* Ask Our Guide Card */}
        <Card className="bg-[#D3D3C1] p-3 col-span-1 row-span-1">
          <CardContent className="flex flex-col items-start justify-start h-full text-left">
            <div className="space-y-2">
              <p className="text-sm uppercase">Have queries ?</p>
              <h2 className="text-2xl font-bold">ASK OUR GUIDE!</h2>
              <p className="text-xs">AI Powered Chat Guidance for members...</p>
            </div>
            <div className="flex justify-between items-center">
              <Link href="/chat">
                <Button variant="secondary" className="group text-sm">
                  Talk with Us
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <div
                className="w-[80px] h-[80px] bg-transparent"
                aria-hidden="true"
              />
            </div>
          </CardContent>
        </Card>

        {/* Fill Up Card */}
        <Card className="bg-[#DEB887] p-3 col-span-1 row-span-1">
          <CardContent className="flex flex-col justify-between h-full text-left">
            <div className="space-y-2">
              <p className="text-sm uppercase">
                Give us your valuable insights!
              </p>
              <h2 className="text-2xl font-bold">FILL UP !</h2>
              <p className="text-xs">
                A curated Survey helping us to Understand you Better...
              </p>
            </div>
            <div className="flex justify-between items-start mt-2">
              <Link href="https://shakti-survey-builder.vercel.app/">
                <Button variant="secondary" className="group text-sm">
                  Click Here
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <div
                className="w-[80px] h-[80px] bg-transparent"
                aria-hidden="true"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Features Section */}
      <Card className="bg-[#00411A] text-white">
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 text-left">
          <div className="flex items-center gap-4">
            <Truck className="h-8 w-8" />
            <div>
              <h3 className="font-semibold">Free Shipping</h3>
              <p className="text-sm">Free shipping on all your order</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <HeadphonesIcon className="h-8 w-8" />
            <div>
              <h3 className="font-semibold">Customer Support 24/7</h3>
              <p className="text-sm">Instant access to Support</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ShieldCheck className="h-8 w-8" />
            <div>
              <h3 className="font-semibold">100% Secure Payment</h3>
              <p className="text-sm">We ensure your money is save</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <RefreshCw className="h-8 w-8" />
            <div>
              <h3 className="font-semibold">Money-Back Guarantee</h3>
              <p className="text-sm">30 Days Money-Back Guarantee</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
