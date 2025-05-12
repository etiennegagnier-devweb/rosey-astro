import { defineCollection, z } from "astro:content";

const seoSchema = z
  .object({
    page_description: z.string().nullable(),
    canonical_url: z.string().nullable(),
    featured_image: z.string().nullable(),
    featured_image_alt: z.string().nullable(),
    author_twitter_handle: z.string().nullable(),
    open_graph_type: z.string().nullable(),
    no_index: z.boolean(),
  })
  .optional();

const blogCollection = defineCollection({
  schema: z.object({
    date: z.string().or(z.date()),
    title: z.string(),
    tags: z.array(z.string()),
    author: z.string(),
    thumb_image_path: z.string(),
    thumb_image_alt: z.string(),
    image: z.string(),
    image_alt: z.string(),
    seo: seoSchema,
  }),
});

const flexColumnSchema = z.object({
  _bookshop_name: z.literal('flexColumn'),
  width: z.string().optional(),
  grow: z.number().optional(),
  shrink: z.number().optional(),
  basis: z.string().optional(),
  order: z.number().optional(),
  widths: z.object({
    mobile: z.string().optional(),
    tablet: z.string().optional(),
    desktop: z.string().optional()
  }).optional(),
  hide: z.enum(['none', 'mobile', 'tablet', 'desktop']).optional(),
  alignSelf: z.enum(['auto', 'start', 'center', 'end', 'stretch', 'baseline']).optional(),
  padding: z.string().optional(),
  margin: z.string().optional(),
  backgroundColor: z.string().optional(),
  className: z.string().optional(),
  shadow: z.enum(['none', 'sm', 'md', 'lg']).optional(),
  rounded: z.enum(['none', 'sm', 'md', 'lg', 'full']).optional(),
  border: z.boolean().optional(),
  borderColor: z.string().optional(),
  animationDelay: z.number().optional()
});

const flexColumnsSchema = z.object({
  _bookshop_name: z.literal('flexColumns'),
  columns: z.union([
    z.number(),
    z.object({
      mobile: z.number().optional(),
      tablet: z.number().optional(),
      desktop: z.number().optional()
    })
  ]).optional(),
  gap: z.union([
    z.string(),
    z.object({
      x: z.string().optional(),
      y: z.string().optional()
    })
  ]).optional(),
  rowGap: z.string().optional(),
  columnGap: z.string().optional(),
  direction: z.enum(['row', 'column', 'row-reverse', 'column-reverse']).optional(),
  wrap: z.enum(['nowrap', 'wrap', 'wrap-reverse']).optional(),
  alignItems: z.enum(['start', 'center', 'end', 'stretch', 'baseline']).optional(),
  justifyContent: z.enum(['start', 'center', 'end', 'between', 'around', 'evenly']).optional(),
  alignContent: z.enum(['start', 'center', 'end', 'between', 'around', 'stretch']).optional(),
  fluid: z.boolean().optional(),
  maxWidth: z.string().optional(),
  padding: z.string().optional(),
  margin: z.string().optional(),
  backgroundColor: z.string().optional(),
  className: z.string().optional(),
  breakpoints: z.object({
    mobile: z.string().optional(),
    tablet: z.string().optional(),
    desktop: z.string().optional()
  }).optional(),
  reverseOnMobile: z.boolean().optional(),
  animateEntrance: z.boolean().optional(),
  animationDelay: z.number().optional(),
  staggered: z.boolean().optional()
});

const pageSchema = z.object({
  _schema: z.string().optional(),
  title: z.string(),
  content_blocks: z.array(z.any()),
  flex_columns: z.array(z.union([flexColumnSchema, flexColumnsSchema])),
  seo: seoSchema,
});

const paginatedCollectionSchema = z.object({
  title: z.string(),
  page_size: z.number().positive(),
  seo: seoSchema,
});

const pagesCollection = defineCollection({
  schema: z.union([paginatedCollectionSchema, pageSchema]),
});

export const collections = {
  blog: blogCollection,
  pages: pagesCollection,
};
