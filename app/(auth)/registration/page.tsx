import { RegistrationForm } from "@/components/auth/registration-form"
import { DecorativeShapes } from "@/components/auth/decorative-shapes"

export default function RegistrationPage() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
      <DecorativeShapes />

      <div className="relative z-10 container mx-auto px-4 py-8 lg:py-12">
        <div className="flex min-h-[calc(100vh-4rem)] items-center">
          <div className="grid w-full gap-8 lg:grid-cols-12 lg:gap-12 items-center">
            <div className="lg:col-span-8 hidden lg:block">
              <div className="relative aspect-4/3 w-full">
                <img
                  src="/images/registration.png"
                  alt="Registration illustration showing people interacting with mobile interface"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="lg:col-span-4">
              <RegistrationForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
