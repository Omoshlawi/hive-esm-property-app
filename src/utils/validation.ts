import { z } from "zod";

// Property Media
export const PropertyMediaSchema = z.object({
  type: z.enum(["IMAGE", "VIDEO", "DOCUMENT", "TOUR_3D"]),
  url: z.string().optional(),
  title: z.string().min(1, "Required").optional(),
  description: z.string().min(1, "Required").optional(),
  order: z.number({ coerce: true }).int().nonnegative().optional(),
  metadata: z
    .object({
      size: z.number({
        coerce: true,
      }),
      memeType: z.string().min(1, "Required").optional(),
      id: z.string().min(1, "Required").uuid(),
    })
    .optional(),
});

// Property
export const PropertySchema = z.object({
  name: z.string().min(1, "Required"),
  description: z.string().optional(),
  thumbnail: z.string().optional(),
  attributes: z
    .array(
      z.object({
        attributeId: z
          .string()
          .min(1, "Required")
          .uuid("Invalid attribute type"),
        value: z.string().min(1, "Required"),
      })
    )
    .optional(),
  addressId: z.string().min(1, "Required").uuid("invalid address"),
  media: z.array(PropertyMediaSchema).optional(),
  amenities: z.array(z.string().uuid()).optional(),
  categories: z.array(z.string().uuid()).optional(),
});

// Property attribute
export const PropertyAttributeSchema = z.object({
  propertyId: z.string().uuid(),
  attributeId: z.string().uuid(),
  value: z.string().min(1, "Required"),
});

// Property Amenity
export const PropertyAmenitySchema = z.object({
  propertyId: z.string().uuid(),
  amenityId: z.string().uuid(),
});

// property category
export const PropertyCategorySchema = z.object({
  propertyId: z.string().uuid(),
  categoryId: z.string().uuid(),
});

// Relationship
export const RelationshipSchema = z.object({
  propertyAId: z.string().uuid(),
  propertyBId: z.string().uuid(),
  startDate: z.date({ coerce: true }),
  endDate: z.date({ coerce: true }).optional(),
  typeId: z.string().uuid(),
});

// Property Location
export const PropertyLocation = z.object({
  propertyId: z.string().uuid(),
  addressLine1: z.string().min(1, "Required"),
  addressLine2: z.string().min(1, "Required").optional(),
  city: z.string().min(1, "Required"),
  state: z.string().min(1, "Required"),
  country: z.string().min(1, "Required"),
  postalCode: z.string().min(1, "Required"),
  latitude: z.number({ coerce: true }).optional(),
  longitude: z.number({ coerce: true }).optional(),
  geospatialData: z.record(z.any()),
});
