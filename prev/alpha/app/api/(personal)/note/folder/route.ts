import { connectDB } from "@/utils/connectDB";
import Model from "@/models/personal/NoteFolder";
import User from "@/models/User";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const userID = searchParams.get("userID");

    if (id) {
      const item = await Model.findOne({ _id: id });
      return new Response(JSON.stringify(item), {
        status: 200,
      });
    }
    if (userID) {
      const items = await Model.find({ user: userID });
      return new Response(JSON.stringify(items), {
        status: 200,
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const { user, name } = await req.json();

    const userExists = await User.findById(user);

    if (!userExists) {
      return new Response(JSON.stringify({ message: "Invalid User" }), {
        status: 400,
      });
    }
    const newItem = new Model({ user, name });
    await newItem.save();

    return new Response(JSON.stringify(newItem), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function PATCH(req: Request) {
  try {
    await connectDB();
    const { user, name } = await req.json();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const updatedItem = await Model.findByIdAndUpdate(
      id,
      {
        user,
        name,
      },
      { new: true }
    );

    return new Response(JSON.stringify(updatedItem), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectDB();
    console.log("received");
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    console.log("passs");
    const deletedItem = await Model.findByIdAndDelete(id);
    console.log("passed");
    return new Response(JSON.stringify(deletedItem), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}