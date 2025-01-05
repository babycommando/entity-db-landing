"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DotPattern from "@/components/ui/dot-pattern";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { SparklesCore } from "@/components/ui/sparkles";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Book, BookOpen, Code, Github, Terminal } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
//@ts-ignore
import { EntityDB } from "@babycommando/entity-db";
import { Input } from "@/components/ui/input";
import PackageInstallComponent from "@/components/packages";

interface Vector {
  id: number;
  text: string;
  embedding: number[];
  similarity?: number; // Add the similarity property, which is calculated during query
  distance?: number;
}

export default function Home() {
  const [searchValue, setSearchValue] = useState("Canine");
  const [status, setStatus] = useState<any>(null);
  const [queryStatus, setQueryStatus] = useState<any>(null);
  const [queryResult, setQueryResult] = useState<Vector[] | null>(null);

  // Initialize the VectorDB
  const db = new EntityDB({
    vectorPath: "embedding",
  });

  const insertVectors = async () => {
    try {
      const key1 = await db.insert({
        text: "cars", // This will auto-generate embedding
      });
      const key2 = await db.insert({
        text: "dogs",
      });
      const key3 = await db.insert({
        text: "cats",
      });

      setStatus(`✅ Inserted vectors with keys: ${key1}, ${key2}, ${key3}`);
    } catch (error) {
      setStatus(`Error inserting vectors: ${error}`);
    }
  };

  const queryVectors = async () => {
    try {
      if (!searchValue.trim()) {
        setStatus("Please enter text to query.");
        return;
      }

      // Convert the query text into embeddings
      const result: Vector[] = await db.query(searchValue, { limit: 20 });

      setQueryResult(result);
      setQueryStatus("Query complete.");
    } catch (error) {
      setQueryStatus(`Error querying vectors: ${error}`);
    }
  };

  return (
    <div className="h-screen">
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
        {/* <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white">
          Dot Pattern
        </p> */}
        <p className="mb-12 text-sm ">⭐ Star EntityDB on Github!</p>
        <img
          src="/assets/entity.png"
          className="w-[90%] md:w-[30%] z-10 mb-8 md:mb-24"
        />
        <GooeyText
          className="hidden md:block z-10 w md:w-[700px] font-bold"
          morphTime={1}
          cooldownTime={1.5}
          texts={["EntityDB", "A Vector DB in Your Browser"]}
        />
        <h1 className="block md:hidden text-6xl font-bold">EntityDB</h1>
        <h2 className="block md:hidden mt-2 text-xl">
          A Vector DB in You Browser
        </h2>
        <br />
        <div className="z-10 md:mt-24 w-[90%] md:w-[40%]">
          <PackageInstallComponent />
        </div>
        <br />
        <div className="  z-10 h-30">
          <div className=" flex gap-2 md:gap-4">
            <a
              href="https://github.com/babycommando/entity-db"
              target="_blank"
              rel="noopener noreferrer">
              <RainbowButton className="h-full gap-2 text-sm font-bold">
                <GitHubLogoIcon className="" />
                Github
              </RainbowButton>
            </a>

            <a
              href="https://github.com/babycommando/entity-db?tab=readme-ov-file#usage"
              target="_blank"
              rel="noopener noreferrer">
              <Button
                onClick={() => console.log("hy")}
                className=" rounded-xl text-sm font-bold ">
                <Code strokeWidth={2.5} />
                Explore The Docs
              </Button>
            </a>
          </div>
        </div>

        <DotPattern
          className={
            "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
          }
        />
      </div>
      <div className="relative flex min-h-screen p-4 w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
        {/* <CardSpotlight className="h-96 w-96">
          <p className="text-xl font-bold relative z-20 mt-2 text-white">
            Authentication steps
          </p>
          <div className="text-neutral-200 mt-4 relative z-20">
            Follow these steps to secure your account:
          </div>
          <p className="text-neutral-300 mt-4 relative z-20 text-sm">
            Ensuring your account is properly secured helps protect your
            personal information and data.
          </p>
        </CardSpotlight> */}
        {/* <FlickeringGrid
          className="z-0 inset-0 size-full"
          squareSize={4}
          gridGap={6}
          color="#1361bb"
          maxOpacity={0.5}
          flickerChance={0.1}
        /> */}
        <div className="z-10">
          <p>See EntityDB In Action</p>
          <br />
          <Card className="mb-4">
            <CardHeader>
              <CardDescription>Create DB</CardDescription>
              <CardTitle className="text-2xl">
                Open Developer Tools (Press F12)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Under the <b>Application</b> tab open <b>IndexedDB</b> and check
                for a table named <b>Vectors</b>.
              </p>
              <p className="text-sm">It was created just by opening the site</p>
            </CardContent>
          </Card>

          <Card className="mb-4">
            <CardHeader>
              <CardDescription>Add Data</CardDescription>
              <CardTitle className="text-2xl">
                Now Let's Add New Embeddings To It
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p>
                Let's embed and store the words <b>Dog</b>, <b>Cat</b> and{" "}
                <b>Car</b>.
              </p>
              <div>
                <Button
                  disabled={status}
                  className="h-8 mt-4"
                  onClick={() => insertVectors()}>
                  Add Data
                </Button>
              </div>
              <div>
                {status && <p className="text-green-400 mt-4">{status}</p>}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Query Vectors</CardDescription>
              <CardTitle className="text-2xl">
                Query Vectors By Similarity Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <p className="text-sm mb-2">
                  Let's apply the cosine similarity search over the stored
                  vectors by embedding an input query.
                </p>

                <p>Search</p>
                <div className="flex gap-2">
                  <Input
                    className="h-8"
                    type="text"
                    placeholder="Search Value"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                  <Button
                    className="text-sm h-8"
                    onClick={() => queryVectors()}>
                    Search
                  </Button>
                </div>
              </div>
            </CardContent>

            {queryResult && (
              <CardFooter>
                <div className="mb-2">
                  {queryStatus && (
                    <p className="text-green-400">Query Completed!</p>
                  )}
                  <h3>Results:</h3>
                  <ul>
                    {queryResult.map((item, index) => (
                      <li key={index}>
                        <strong>ID:</strong> {item.id} | <strong>Text:</strong>{" "}
                        {item.text} | <strong>Similarity:</strong>{" "}
                        {item.similarity?.toFixed(4)}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardFooter>
            )}
          </Card>
        </div>
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={200}
          className="absolute top-0 left-0 w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
    </div>
  );
}
