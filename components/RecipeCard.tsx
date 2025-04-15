"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bookmark, BookmarkCheck, MoreVertical } from "lucide-react";
import Image from "next/image";

interface RecipeCardProps {
  title: string;
  ingredients: string[];
  tags?: string[];
  imageUrl?: string;
  prepTime?: string;
  servings?: number;
  isBookmarked?: boolean;
  onView?: () => void;
  onDelete?: () => void;
  onBookmark?: () => void;
  onDuplicate?: () => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  title,
  ingredients,
  tags = [],
  imageUrl,
  prepTime,
  servings,
  isBookmarked = false,
  onView,
  onDelete,
  onBookmark,
  onDuplicate,
}) => (
  <div className="relative rounded-2xl border p-4 shadow hover:shadow-xl hover:scale-[1.01] transition-transform duration-200 group bg-background">
    {imageUrl && (
      <div className="w-full h-40 relative mb-3 rounded-md overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          loading="lazy"
        />
      </div>
    )}

    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
      <Button
        size="icon"
        variant="ghost"
        onClick={onBookmark}
        aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
      >
        {isBookmarked ? (
          <BookmarkCheck className="text-primary h-5 w-5" />
        ) : (
          <Bookmark className="h-5 w-5" />
        )}
      </Button>
    </div>

    {(prepTime || servings) && (
      <p className="text-xs text-muted-foreground mt-1">
        {prepTime && `${prepTime}`} {prepTime && servings && "•"}{" "}
        {servings && `${servings} servings`}
      </p>
    )}

    {tags.length > 0 && (
      <div className="flex flex-wrap gap-1 mt-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    )}

    <p className="text-sm text-muted-foreground mt-2">
      {ingredients.slice(0, 3).join(", ")}
      {ingredients.length > 3 && "..."}
    </p>

    <div className="mt-4 flex items-center justify-between gap-2">
      <div className="flex gap-2">
        {onView && (
          <Button variant="outline" onClick={onView} aria-label="View Recipe">
            View
          </Button>
        )}
        {onDelete && (
          <Button
            variant="destructive"
            onClick={onDelete}
            aria-label="Delete Recipe"
          >
            Delete
          </Button>
        )}
      </div>

      {(onDuplicate || onView || onDelete) && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="ml-auto"
              aria-label="More options"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {onView && (
              <DropdownMenuItem onClick={onView}>View</DropdownMenuItem>
            )}
            {onDelete && (
              <DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
            )}
            {onDuplicate && (
              <DropdownMenuItem onClick={onDuplicate}>
                Duplicate
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  </div>
);
