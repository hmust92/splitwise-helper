import { useLayoutEffect } from "react";
import { useRouter } from "next/router";
const Index = () => {
    const router = useRouter();

    useLayoutEffect(() => {
        router.replace("/home/[[...params]]", "/home");
    }, [router]);

    return null;
};

export default Index;
