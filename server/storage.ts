import { 
  type User, type InsertUser, 
  type Project, type InsertProject,
  type Transaction, type InsertTransaction,
  type CarbonCredit, type InsertCarbonCredit,
  type MrvData, type InsertMrvData,
  type CommunityPost, type InsertCommunityPost,
  type CommunityMember, type InsertCommunityMember
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Projects
  getProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<Project>): Promise<Project | undefined>;
  
  // Transactions
  getTransactions(): Promise<Transaction[]>;
  getTransaction(id: string): Promise<Transaction | undefined>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  
  // Carbon Credits
  getCarbonCredits(): Promise<CarbonCredit[]>;
  getCarbonCredit(id: string): Promise<CarbonCredit | undefined>;
  createCarbonCredit(credit: InsertCarbonCredit): Promise<CarbonCredit>;
  
  // MRV Data
  getMrvData(projectId?: string): Promise<MrvData[]>;
  createMrvData(data: InsertMrvData): Promise<MrvData>;
  
  // Community
  getCommunityPosts(): Promise<CommunityPost[]>;
  createCommunityPost(post: InsertCommunityPost): Promise<CommunityPost>;
  getCommunityMembers(): Promise<CommunityMember[]>;
  createCommunityMember(member: InsertCommunityMember): Promise<CommunityMember>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private projects: Map<string, Project>;
  private transactions: Map<string, Transaction>;
  private carbonCredits: Map<string, CarbonCredit>;
  private mrvData: Map<string, MrvData>;
  private communityPosts: Map<string, CommunityPost>;
  private communityMembers: Map<string, CommunityMember>;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.transactions = new Map();
    this.carbonCredits = new Map();
    this.mrvData = new Map();
    this.communityPosts = new Map();
    this.communityMembers = new Map();
    
    this.initializeData();
  }

  private initializeData() {
    // Initialize with some sample data for demo purposes
    const project1: Project = {
      id: "proj-1",
      name: "Sundarbans Revival",
      description: "Large-scale mangrove restoration in the Sundarbans delta, focusing on biodiversity conservation and carbon sequestration.",
      location: "West Bengal",
      type: "mangrove",
      status: "active",
      areaHectares: "2500.00",
      carbonCredits: 15840,
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      lastUpdate: new Date(),
      createdAt: new Date(),
    };

    const project2: Project = {
      id: "proj-2",
      name: "Tamil Nadu Seagrass",
      description: "Seagrass meadow restoration along the Tamil Nadu coast to enhance marine biodiversity and carbon storage.",
      location: "Tamil Nadu",
      type: "seagrass",
      status: "planning",
      areaHectares: "1800.00",
      carbonCredits: 11200,
      imageUrl: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      lastUpdate: new Date(),
      createdAt: new Date(),
    };

    const project3: Project = {
      id: "proj-3",
      name: "Rann of Kutch Shield",
      description: "Saltmarsh restoration in Gujarat's coastal areas to protect against storm surge and enhance carbon sequestration.",
      location: "Gujarat",
      type: "saltmarsh",
      status: "active",
      areaHectares: "3200.00",
      carbonCredits: 19600,
      imageUrl: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      lastUpdate: new Date(),
      createdAt: new Date(),
    };

    this.projects.set("proj-1", project1);
    this.projects.set("proj-2", project2);
    this.projects.set("proj-3", project3);

    // Add some transactions
    const tx1: Transaction = {
      id: "tx-1",
      hash: "0xa7b3...c8d9",
      type: "carbon_credit",
      fromAddress: "0x123...456",
      toAddress: "0x789...abc",
      value: "250 CC",
      blockNumber: 12847,
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
    };

    const tx2: Transaction = {
      id: "tx-2",
      hash: "0xf2e1...a4b6",
      type: "registry_update",
      fromAddress: "0xdef...ghi",
      toAddress: "Contract",
      value: "-",
      blockNumber: 12846,
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
    };

    this.transactions.set("tx-1", tx1);
    this.transactions.set("tx-2", tx2);

    // Add carbon credits
    const credit1: CarbonCredit = {
      id: "credit-1",
      projectId: "proj-1",
      quantity: 500,
      pricePerTonne: "2850.00",
      isAvailable: true,
      sellerAddress: "0x123...456",
      createdAt: new Date(),
    };

    const credit2: CarbonCredit = {
      id: "credit-2",
      projectId: "proj-2",
      quantity: 300,
      pricePerTonne: "2820.00",
      isAvailable: true,
      sellerAddress: "0x789...abc",
      createdAt: new Date(),
    };

    this.carbonCredits.set("credit-1", credit1);
    this.carbonCredits.set("credit-2", credit2);

    // Add community posts
    const post1: CommunityPost = {
      id: "post-1",
      projectId: "proj-1",
      author: "Sundarbans Restoration Team",
      content: "Great progress today! Our community volunteers planted 500 mangrove saplings in the Sundarbans delta. The local fishing community is actively participating in the restoration efforts.",
      imageUrl: "https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      likes: 24,
      comments: 8,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    };

    const post2: CommunityPost = {
      id: "post-2",
      projectId: "proj-3",
      author: "Gujarat Coastal Initiative",
      content: "Excited to announce that our saltmarsh restoration project has reached 80% completion. The local community has been instrumental in monitoring water quality and maintaining the restored areas.",
      likes: 31,
      comments: 12,
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    };

    this.communityPosts.set("post-1", post1);
    this.communityPosts.set("post-2", post2);

    // Add community members
    const member1: CommunityMember = {
      id: "member-1",
      name: "Sundarbans Team",
      points: 1247,
      projectsCount: 3,
      joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    };

    const member2: CommunityMember = {
      id: "member-2",
      name: "Gujarat Coastal",
      points: 1189,
      projectsCount: 2,
      joinedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
    };

    const member3: CommunityMember = {
      id: "member-3",
      name: "Tamil Nadu Seagrass",
      points: 967,
      projectsCount: 1,
      joinedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    };

    this.communityMembers.set("member-1", member1);
    this.communityMembers.set("member-2", member2);
    this.communityMembers.set("member-3", member3);
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = {
      ...insertProject,
      id,
      carbonCredits: 0,
      lastUpdate: new Date(),
      createdAt: new Date(),
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: string, updates: Partial<Project>): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    
    const updated = { ...project, ...updates, lastUpdate: new Date() };
    this.projects.set(id, updated);
    return updated;
  }

  async getTransactions(): Promise<Transaction[]> {
    return Array.from(this.transactions.values()).sort((a, b) => 
      new Date(b.timestamp!).getTime() - new Date(a.timestamp!).getTime()
    );
  }

  async getTransaction(id: string): Promise<Transaction | undefined> {
    return this.transactions.get(id);
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = randomUUID();
    const transaction: Transaction = {
      ...insertTransaction,
      id,
      timestamp: new Date(),
    };
    this.transactions.set(id, transaction);
    return transaction;
  }

  async getCarbonCredits(): Promise<CarbonCredit[]> {
    return Array.from(this.carbonCredits.values());
  }

  async getCarbonCredit(id: string): Promise<CarbonCredit | undefined> {
    return this.carbonCredits.get(id);
  }

  async createCarbonCredit(insertCredit: InsertCarbonCredit): Promise<CarbonCredit> {
    const id = randomUUID();
    const credit: CarbonCredit = {
      ...insertCredit,
      id,
      createdAt: new Date(),
    };
    this.carbonCredits.set(id, credit);
    return credit;
  }

  async getMrvData(projectId?: string): Promise<MrvData[]> {
    const data = Array.from(this.mrvData.values());
    return projectId ? data.filter(d => d.projectId === projectId) : data;
  }

  async createMrvData(insertData: InsertMrvData): Promise<MrvData> {
    const id = randomUUID();
    const data: MrvData = {
      ...insertData,
      id,
      collectedAt: new Date(),
    };
    this.mrvData.set(id, data);
    return data;
  }

  async getCommunityPosts(): Promise<CommunityPost[]> {
    return Array.from(this.communityPosts.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async createCommunityPost(insertPost: InsertCommunityPost): Promise<CommunityPost> {
    const id = randomUUID();
    const post: CommunityPost = {
      ...insertPost,
      id,
      likes: 0,
      comments: 0,
      createdAt: new Date(),
    };
    this.communityPosts.set(id, post);
    return post;
  }

  async getCommunityMembers(): Promise<CommunityMember[]> {
    return Array.from(this.communityMembers.values()).sort((a, b) => 
      (b.points || 0) - (a.points || 0)
    );
  }

  async createCommunityMember(insertMember: InsertCommunityMember): Promise<CommunityMember> {
    const id = randomUUID();
    const member: CommunityMember = {
      ...insertMember,
      id,
      points: 0,
      projectsCount: 0,
      joinedAt: new Date(),
    };
    this.communityMembers.set(id, member);
    return member;
  }
}

export const storage = new MemStorage();
