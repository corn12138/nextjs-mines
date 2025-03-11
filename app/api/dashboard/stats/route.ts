import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    // Get user count
    const userCount = await db.user.count();
    
    // Get product count (example)
    const productCount = await db.product.count();
    
    // Get order count (example)
    const orderCount = await db.order.count();
    
    // Get recent orders
    const recentOrders = await db.order.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc"
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });
    
    // Get sales data for chart
    const currentDate = new Date();
    const lastMonth = new Date(currentDate);
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    
    const salesData = await db.order.groupBy({
      by: ["createdAt"],
      _sum: {
        total: true
      },
      where: {
        createdAt: {
          gte: lastMonth
        }
      },
      orderBy: {
        createdAt: "asc"
      }
    });
    
    return NextResponse.json({
      userCount,
      productCount,
      orderCount,
      recentOrders,
      salesData
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}