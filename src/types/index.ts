import z from "zod";
import {
  PropertyMediaSchema,
  PropertySchema,
  RelationshipSchema,
} from "../utils/validation";

export type PropertyMediaFormData = z.infer<typeof PropertyMediaSchema>;
export type PropertyFormData = z.infer<typeof PropertySchema>;
export type PropertyRelationshipFormData = z.infer<typeof RelationshipSchema>;

export interface Organization {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  voided: boolean;
}

export interface Address {
  id: string;
  name: string;
  description: string;
  country: string;
  county: string;
  subCounty: string;
  ward: string;
  village?: string;
  landmark: string;
  postalCode?: string;
  latitude?: string;
  longitude?: string;
  ownerUserId: string;
  ownerUser: string;
  organizationId?: string;
  organization?: Organization;
  metadata?: Record<string, any>;
  createdBy: string;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Property {
  id: string;
  name: string;
  description: any;
  thumbnail: string;
  organizationId: string;
  organization?: Organization;
  addressId: string;
  address?: Address;
  createdBy: string;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
  categories?: PropertyCategory[];
  amenities?: PropertyAmenity[];
  attributes?: Attribute[];
  status:
    | "BLOCKED"
    | "DRAFT"
    | "ARCHIVED"
    | "APPROVED"
    | "REJECTED"
    | "PAUSED"
    | "PENDING";
}
export interface RelationshipType {
  id: string;
  description: any;
  aIsToB: string;
  bIsToA: string;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Relationship {
  id: string;
  propertyAId: string;
  propertyBId: string;
  startDate: string;
  endDate?: string;
  typeId: string;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
  propertyA?: Property;
  propertyB?: Property;
  type?: RelationshipType;
}

export interface PropertyMedia {
  id: string;
  propertyId: string;
  type: "IMAGE" | "VIDEO" | "DOCUMENT" | "TOUR_3D";
  url: string;
  title: any;
  description: string;
  metadata: Metadata;
  order: number;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Metadata {
  size: number;
  memeType: string;
}

export interface Icon {
  name: string;
  family: string;
}
export interface Amenity {
  id: string;
  name: string;
  organizationId: any;
  icon: Icon;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface PropertyAmenity {
  id: string;
  propertyId: string;
  amenityId: string;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
  amenity?: Amenity;
}

export interface Category {
  id: string;
  name: string;
  organizationId: any;
  icon: Icon;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyCategory {
  id: string;
  propertyId: string;
  categoryId: string;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
  category?: Category;
}

export interface AttributeType {
  id: string;
  name: string;
  organizationId: any;
  icon: Icon;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Attribute {
  id: string;
  propertyId: string;
  attributeId: string;
  value: string;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
  attribute?: AttributeType;
}

export interface County {
  code: string;
  name: string;
  capital: string;
  metadata: any;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
  subCounties: SubCounty[];
}

export interface SubCounty {
  code: string;
  name: string;
  countyCode: string;
  metadata: any;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
  wards: Ward[];
}

export interface Ward {
  code: string;
  name: string;
  countyCode: string;
  subCountyCode: string;
  metadata: any;
  voided: boolean;
  createdAt: string;
  updatedAt: string;
}

export type RelatedProperty = {
  id: string;
  name: string;
  relationshipToIndex: string;
  relationship: Relationship;
};

export interface PropertyStatus {
  id: string;
  propertyId: string;
  previousStatus: string;
  newStatus: string;
  changedBy: string;
  reason: any;
  createdAt: string;
}
