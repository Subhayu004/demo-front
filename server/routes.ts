import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertProjectSchema, 
  insertTransactionSchema, 
  insertCarbonCreditSchema,
  insertMrvDataSchema,
  insertCommunityPostSchema,
  insertCommunityMemberSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Projects
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.getProject(req.params.id);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch project" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validatedData);
      res.status(201).json(project);
    } catch (error) {
      res.status(400).json({ error: "Invalid project data" });
    }
  });

  // Transactions
  app.get("/api/transactions", async (req, res) => {
    try {
      const transactions = await storage.getTransactions();
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch transactions" });
    }
  });

  app.post("/api/transactions", async (req, res) => {
    try {
      const validatedData = insertTransactionSchema.parse(req.body);
      const transaction = await storage.createTransaction(validatedData);
      res.status(201).json(transaction);
    } catch (error) {
      res.status(400).json({ error: "Invalid transaction data" });
    }
  });

  // Carbon Credits
  app.get("/api/carbon-credits", async (req, res) => {
    try {
      const credits = await storage.getCarbonCredits();
      res.json(credits);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch carbon credits" });
    }
  });

  app.post("/api/carbon-credits", async (req, res) => {
    try {
      const validatedData = insertCarbonCreditSchema.parse(req.body);
      const credit = await storage.createCarbonCredit(validatedData);
      res.status(201).json(credit);
    } catch (error) {
      res.status(400).json({ error: "Invalid carbon credit data" });
    }
  });

  // MRV Data
  app.get("/api/mrv-data", async (req, res) => {
    try {
      const projectId = req.query.projectId as string;
      const data = await storage.getMrvData(projectId);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch MRV data" });
    }
  });

  app.post("/api/mrv-data", async (req, res) => {
    try {
      const validatedData = insertMrvDataSchema.parse(req.body);
      const data = await storage.createMrvData(validatedData);
      res.status(201).json(data);
    } catch (error) {
      res.status(400).json({ error: "Invalid MRV data" });
    }
  });

  // Community
  app.get("/api/community/posts", async (req, res) => {
    try {
      const posts = await storage.getCommunityPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch community posts" });
    }
  });

  app.post("/api/community/posts", async (req, res) => {
    try {
      const validatedData = insertCommunityPostSchema.parse(req.body);
      const post = await storage.createCommunityPost(validatedData);
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ error: "Invalid post data" });
    }
  });

  app.get("/api/community/members", async (req, res) => {
    try {
      const members = await storage.getCommunityMembers();
      res.json(members);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch community members" });
    }
  });

  // Analytics endpoints
  app.get("/api/analytics/dashboard", async (req, res) => {
    try {
      const projects = await storage.getProjects();
      const transactions = await storage.getTransactions();
      const credits = await storage.getCarbonCredits();
      
      const totalProjects = projects.length;
      const totalCredits = projects.reduce((sum, p) => sum + p.carbonCredits, 0);
      const totalTransactions = transactions.length;
      const activeMonitoring = projects.filter(p => p.status === 'active').length;

      const analytics = {
        totalProjects,
        totalCredits,
        totalTransactions,
        activeMonitoring,
        projectTypes: {
          mangrove: projects.filter(p => p.type === 'mangrove').length,
          seagrass: projects.filter(p => p.type === 'seagrass').length,
          saltmarsh: projects.filter(p => p.type === 'saltmarsh').length,
        },
        monthlyData: [
          { month: 'Jan', credits: 12000 },
          { month: 'Feb', credits: 15000 },
          { month: 'Mar', credits: 18000 },
          { month: 'Apr', credits: 22000 },
          { month: 'May', credits: 25000 },
          { month: 'Jun', credits: 28000 },
        ],
        sequestrationData: [
          { quarter: 'Q1', sequestration: 8500 },
          { quarter: 'Q2', sequestration: 12300 },
          { quarter: 'Q3', sequestration: 15600 },
          { quarter: 'Q4', sequestration: 18900 },
        ],
        biodiversityData: {
          fishSpecies: 85,
          birdSpecies: 78,
          plantSpecies: 92,
          waterQuality: 88,
          habitatQuality: 94,
        },
      };

      res.json(analytics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch analytics data" });
    }
  });

  app.get("/api/analytics/blockchain", async (req, res) => {
    try {
      const transactions = await storage.getTransactions();
      
      const blockchainStats = {
        totalBlocks: 12847,
        totalTransactions: transactions.length,
        smartContracts: 342,
        networkHashRate: "2.3 TH/s",
      };

      res.json(blockchainStats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blockchain stats" });
    }
  });

  app.get("/api/analytics/marketplace", async (req, res) => {
    try {
      const credits = await storage.getCarbonCredits();
      
      const marketStats = {
        marketPrice: 2847,
        tradingVolume: 24891,
        availableCredits: credits.reduce((sum, c) => sum + c.quantity, 0),
        priceChange: 12.5,
        volumeChange: 8.3,
      };

      res.json(marketStats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch market stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
